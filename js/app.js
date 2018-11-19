$(function () {

    var colecaoImobiliaria = localStorage.getItem("colecaoImobiliaria");

    colecaoImobiliaria = JSON.parse(colecaoImobiliaria);
    var indice_selecionado = -1;
    var operacao = "A";


    // Caso colecaoImobiliaria esteja sem conteudo, iniciamos um vetor vazio
    if (colecaoImobiliaria == null) 
        colecaoImobiliaria = [];

    function adicionar() {
        var imov = getImovel("codigo", $("#id").val());

        //* se ID já é existente
        if (imov != null) {
            alert("Código já cadastrado.");
            return;
        }

        //* converte valores para string JSON
        var imovel = JSON.stringify({
            codigo: $("#id").val(),
            finalidade: $("#finalidade").val(),
            tipo: $("#tipo").val(),
            titulo: $("#titulo").val(),
            categoria: $("#categoria").val(),
            area: $("#area").val(),
            valor: $("#valor").val(),
            descricao: $("#descricao").val(),
            quartos: $("#quartos").val(),
            imagem: $("#img-preview").attr("src"),
        });
    
        //* novo imovel é adicionado á coleção 'colecaoImobiliaria' do localStorage.
        colecaoImobiliaria.push(imovel); 
        localStorage.setItem("colecaoImobiliaria", JSON.stringify(colecaoImobiliaria));

        //* index.html é acessado na pagina
        window.open('index.html', "_self");
        //alert("Registro adicionado.");
        return true;
    };

    listar();

    function listar() {

        //* limpa #content-area
        $("#content-area").html("");

        //* lista todas as campanhas com variaveis de valores do localStorage
        for (var i in colecaoImobiliaria) {
            var imovel = JSON.parse(colecaoImobiliaria[i]);
            $("#content-area").append(
                "<div class='item-lista col-sm'><div id='imagem' class='imagem" + i + "'></div>" +
                "<div class='info'>" +
                    "<span class='titulo'>" + imovel.titulo + "</span>" +
                    "</br>" +
                    "<span class='descricao' >" + imovel.descricao + "</span>" +
                    "</br>" +
                    "<div class='section'>" +
                        "<span class='preco'>R$ " + imovel.valor + "</span>" +
                        "<button id='btn-detalhes' alt='" + i + "' type='button' class='btn btn-sm btn-warning' data-toggle='modal' data-target='#modal'>Ver detalhes</button>" +
                        "<button id='btn-excluir' class='btn btn-sm btn-danger' alt='" + i + "'>Excluir</button>" +
                        "<button id ='btn-alterar' class='btn btn-sm btn-info' alt='" + i + "'>Alterar<a href='create.html' target='_blank'></a></button>" +
                    "</div>" +
                "</div>"

            );
            $('.imagem' + i).css("background-image", 'url(' + imovel.imagem + ')');
        }
    }

    function excluir() {
        // .splice(item_removido, do indice 1);
        colecaoImobiliaria.splice(indice_selecionado, 1);

        // remove do localStorage o item
        localStorage.setItem("colecaoImobiliaria", JSON.stringify(colecaoImobiliaria));
        //alert("Imóvel excluído.");
    }

    $("#content-area").on("click", "#btn-excluir", function () {
        // indice_selecionado recebe o valor "alt" daquele this.btn-excluir
        indice_selecionado = parseInt($(this).attr("alt"));
        excluir();
        listar();
    });

    // 'A' = Adiçao    'E' = Edição
    $("#form").on("submit", function (evt) {
        evt.preventDefault();
        if (operacao == 'A') {
            return adicionar();
        }
        else return editar();
    });

    var currentLocation = window.location.href;
    var verificaPageCreate = currentLocation.split('?')[0];

    if (document.title == 'Editar') {
        var parametroDaUrl = currentLocation.split('?')[1];
        var listaDeParametros = parametroDaUrl.split("&");
        var id = listaDeParametros[0].split('=')[1];
        operacao = listaDeParametros[1].split("=")[1];
        indice_selecionado = id;

        var imovel = JSON.parse(colecaoImobiliaria[indice_selecionado])
        $("#id").val(indice_selecionado);
        $("#id").disabled = true;
        $("#finalidade").val(imovel.finalidade);
        $("#tipo").val(imovel.tipo);
        $("#titulo").val(imovel.titulo);
        $("#categoria").val(imovel.categoria);
        $("#area").val(imovel.area);
        $("#valor").val(imovel.valor);
        $("#descricao").val(imovel.descricao);
        $("#quartos").val(imovel.quartos);

        $('#img-preview').remove();
        var image = new Image();
        image.id = 'img-preview';
        var preview = document.querySelector('#imagem-preview');
        preview.appendChild(image);
        image.src = imovel.imagem;
    }

    function editar() {
        // coloca em string os valores
        colecaoImobiliaria[indice_selecionado] = JSON.stringify({
            codigo: $("#id").val(),
            finalidade: $("#finalidade").val(),
            tipo: $("#tipo").val(),
            titulo: $("#titulo").val(),
            categoria: $("#categoria").val(),
            area: $("#area").val(),
            valor: $("#valor").val(),
            descricao: $("#descricao").val(),
            quartos: $("#quartos").val(),
            imagem: $("#img-preview").attr("src"),
        });

        localStorage.setItem("colecaoImobiliaria", JSON.stringify(colecaoImobiliaria));
        //alert("Informações editadas.");
        window.open('index.html', "_self");
        operacao = "A";
        return true;
    };

    $("#content-area").on("click", "#btn-alterar", function () {
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        var url = 'edit.html?id=' + indice_selecionado + '&operacao=' + operacao;
        window.open(url, "_self");
        return indice_selecionado
    });


    function carregarModal(indice_selecionado) {

        var colecaoImobiliaria = localStorage.getItem("colecaoImobiliaria");
        colecaoImobiliaria = JSON.parse(colecaoImobiliaria);
        var imovel = JSON.parse(colecaoImobiliaria[indice_selecionado]);

        $("#md-titulo-imovel").text(imovel.titulo);
        $("#md-tipo-imovel").text(imovel.tipo);
        $("#md-preco-imovel").text(imovel.valor);
        $("#md-imagem-imovel").css("background-image", 'url(' + imovel.imagem + ')');

        if (imovel.finalide == 'vender') {
            imovel.finalide = 'À venda'
        } else imovel.finalidade = 'À alugar';

        $("#md-finalidade-imovel").text(imovel.finalidade);
        $("#md-area-imovel").text(imovel.area);
        $("#md-quartos-imovel").text(imovel.quartos);
        $("#md-descricao-imovel").text(imovel.descricao);

    }

    $("#content-area").on("click", "#btn-detalhes", function () {
        indice_selecionado = parseInt($(this).attr("alt"));
        carregarModal(indice_selecionado);
    });

    $(".main").on("click", "#btn-create", function () {
        url = 'create.html'
        window.open(url, "_self");
    });

    $("#form").on("click", "#btn-cancelar", function () {
        url = 'index.html'
        window.open(url, "_self");
    });

    function getImovel(propriedade, valor) {
        
        var imov = null;
        for (var item in colecaoImobiliaria) {
            var i = JSON.parse(colecaoImobiliaria[item]);
            if (i[propriedade] == valor)
                imov = i;
        }
        return imov;
    }

    $('#img-file').on("change", function () {
        previewFiles();
    });

    var base64;

    function previewFiles() {
        $('#img-preview').remove();
        var preview = document.querySelector('#imagem-preview');
        var indice = 0;
        var files = document.querySelector('input[type=file]').files;


        function readAndPreview(file) {

            // Make sure `file.name` matches our extensions criteria
            if (/\.(jpg|png|gif)$/i.test(file.name)) {
                var reader = new FileReader();


                reader.addEventListener("load", function () {
                    var image = new Image();
                    //image.height = 'auto';
                    image.title = file.name;
                    image.src = this.result;
                    base64 = this.result;
                    image.id = 'img-preview';
                    preview.appendChild(image);
                    indice++;
                    informa64();
                }, false);

                reader.readAsDataURL(file);
            }

        }
        if (files) {
            [].forEach.call(files, readAndPreview);
        }

    }

});

var imoveis;

$("#form").on("click", "#btn-aleatorio", function () {
    imovelAleatorio();
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function imovelAleatorio() {
    printaImovel();

    function printaImovel() {
        // indice recebe um valor aleatório entre 0 e 3 
        rndI = getRandomInt(0, 5);
        idImovel = getRandomInt(0, 200)

        $("#titulo").val(imoveis[rndI].titulo);
        $("#area").val(imoveis[rndI].area);
        $("#valor").val(imoveis[rndI].valor);
        $("#descricao").val(imoveis[rndI].descricao);
        $("#quartos").val(imoveis[rndI].quartos);
        $("#id").val(idImovel);
        $("#tipo").val(imoveis[rndI].tipo);
        $("#finalidade").val(imoveis[rndI].categoria);

        $('#img-preview').remove();
        var image = new Image();
        image.id = 'img-preview';
        var preview = document.querySelector('#imagem-preview');
        preview.appendChild(image);
        image.src = imoveis[rndI].image;

    }
}
