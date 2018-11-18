$(function () {

    var colecaoImobiliaria = localStorage.getItem("colecaoImobiliaria");
    //localStorage.setItem('colecaoImobiliaria', $("#form").html());

    colecaoImobiliaria = JSON.parse(colecaoImobiliaria);
    var indice_selecionado = -1;
    var operacao = "A";

    if (colecaoImobiliaria == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        colecaoImobiliaria = [];

    function adicionar() {
        var imov = getImovel("codigo", $("#id").val()); // cli

        //* Se ID já é existente
        if (imov != null) {
            alert("Código já cadastrado.");
            return;
        }

        if ($("#titulo").val() == "") {
            var placeholder = document.getElementById("titulo").placeholder;
            $("#titulo").val(placeholder);
        }

        if ($("#area").val() == "") {
            var placeholder = document.getElementById("area").placeholder;
            $("#area").val(placeholder);
        }

        if ($("#valor").val() == "") {
            var placeholder = document.getElementById("valor").placeholder;
            $("#valor").val(placeholder);
        }

        if ($("#descricao").val() == "") {
            var placeholder = document.getElementById("descricao").placeholder;
            $("#descricao").val(placeholder);
        }

        if ($("#quartos").val() == "") {
            var placeholder = document.getElementById("quartos").placeholder;
            $("#quartos").val(placeholder);
        }

        //* var imovel = cliente
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

        colecaoImobiliaria.push(imovel); //* novo imovel é adicionado á coleção 'colecaoImobiliaria' do localStorage.
        localStorage.setItem("colecaoImobiliaria", JSON.stringify(colecaoImobiliaria));

        var placeholder = document.getElementById("titulo").placeholder;
        window.open('index.html', "_self");
        alert("Registro adicionado.");
        return true;
    };

    function listar() {

        $("#content-area").html("");

        for (var i in colecaoImobiliaria) {
            var imovel = JSON.parse(colecaoImobiliaria[i]);
            $("#content-area").append("<div class='item-lista col-sm'><div id='imagem' class='imagem"+ i +"'></div>" +
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
            $('.imagem' + i).css("background-image", 'url('+ imovel.imagem + ')');

            
        }
    }

    listar();

    function excluir() {
        colecaoImobiliaria.splice(indice_selecionado, 1);
        localStorage.setItem("colecaoImobiliaria", JSON.stringify(colecaoImobiliaria));
        alert("Imóvel excluído.");
    }

    $("#content-area").on("click", "#btn-excluir", function () {
        indice_selecionado = parseInt($(this).attr("alt"));
        excluir();
        listar();
    });

    function editar() {
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
            imagem: base64
        });
        localStorage.setItem("colecaoImobiliaria", JSON.stringify(colecaoImobiliaria));
        alert("Informações editadas.");
        window.open('index.html', "_self");
        operacao = "A";
        return true;
    };

    $("#form").on("submit", function (evt) {
        evt.preventDefault();
        if (operacao == 'A') {
            return adicionar();
        }
        else {
            return editar();
        }
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
        $('#img-preview').src = base64;
    }

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
        $("#md-imagem-imovel").css("background-image", 'url('+ imovel.imagem + ')');

        if (imovel.finalide == 'vender') {
            imovel.finalide = 'À venda'
        } else
            imovel.finalidade = 'À alugar';

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


    /* 
    var formCadastro = document.getElementById('form');

    formCadastro.addEventListener("submit", function (event) {
        event.preventDefault();
        return adicionar();
    });
    */


    function getImovel(propriedade, valor) {
        var imov = null;
        for (var item in colecaoImobiliaria) {
            var i = JSON.parse(colecaoImobiliaria[item]);
            if (i[propriedade] == valor)
                imov = i;
        }
        return imov;
    }
    //localStorage.clear();

    $('#img-file').on("change", function() {
        previewFiles();
    });

    var base64;

    function previewFiles() {
        $('#img-preview').remove();
        var preview = document.querySelector('#imagem-preview');
        console.log(preview);
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
    function informa64(){
        console.log(base64);
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
  


function imovelAleatorio(){

    axios.get('js/imoveisDB.json')
    .then(function (response) {
        imoveis = response.data.imoveis;
        console.log(response.data.imoveis);

        printaImovel();

        function printaImovel(){
            // indice recebe um valor aleatório entre 0 e 3 
            rndI = getRandomInt(0,5);
            idImovel = getRandomInt(0,200)
            console.log(rndI);

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

            console.log(imoveis[rndI].image);
        }
    })
    .catch(function (error) {
        console.log(error);
    });

}
