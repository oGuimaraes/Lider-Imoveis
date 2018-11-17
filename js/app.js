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
            quartos: $("#quartos").val()
        });

        colecaoImobiliaria.push(imovel); //* novo imovel é adicionado á coleção 'colecaoImobiliaria' do localStorage.
        localStorage.setItem("colecaoImobiliaria", JSON.stringify(colecaoImobiliaria));

        var placeholder = document.getElementById("titulo").placeholder;
        alert(placeholder);

        alert("Registro adicionado.");
        return true;
    };

    function listar() {

        $("#content-area").html("");

        for (var i in colecaoImobiliaria) {
            var imovel = JSON.parse(colecaoImobiliaria[i]);
            $("#content-area").append("<div class='item-lista col-sm'><div class='imagem'></div>" +
                "<div class='info'>" +
                "<span class='titulo'>" + imovel.titulo + "</span>" +
                "</br>" +
                "<span class='descricao' >" + imovel.descricao + "</span>" +
                "</br>" +
                "<div class='section'>" +
                "<span class='preco'> R$ " + imovel.valor + "</span>" +
                "<div class='btn btn-warning'>Ver detalhes</div>" +
                "<button id='btn-excluir' class='btn btn-sm btn-danger' alt='" + i + "'>Excluir</button>" +
                "<button id ='btn-alterar' class='btn btn-sm btn-info' alt='" + i + "'>Alterar<a href='create.html' target='_blank'></a></button>" +
                "</div>" +
                "</div>");
        }
    }

    listar();

    function excluir() {
        colecaoImobiliaria.splice(indice_selecionado, 1);
        localStorage.setItem("colecaoImobiliaria", JSON.stringify(colecaoImobiliaria));
        //alert("Imóvel excluído.");
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
            quartos: $("#quartos").val()
        });
        localStorage.setItem("colecaoImoveis", JSON.stringify(tbClientes));
        alert("Informações editadas.");
        operacao = "A";
        return true;
    };

    $("#form").on("submit", function () {
        if (operacao == "A") {
            return adicionar();
        }
        else
            return editar();
    });

    //verifica qual operação

    var currentLocation = window.location.href;
    var verificaPageCreate = currentLocation.split('?')[0];

    if (document.title == 'Editar'){
        var parametroDaUrl = currentLocation.split('?')[1];
        var listaDeParametros = parametroDaUrl.split("&");
        var id = listaDeParametros[0].split('=')[1];
        var operacao = listaDeParametros[1].split("=")[1];
        indice_selecionado = id;

        var imovel = JSON.parse(colecaoImobiliaria[indice_selecionado])
        $("#id").val(indice_selecionado);
        $("#id").disabled = true;
        $("#finalidade").val(imovel.finalidade);
        $("#tipo").val(imovel.tipo);
        $("#titulo").val(imovel.titulo);
        $("#titulo").focus(imovel.titulo);
        $("#categoria").val(imovel.categoria);
        $("#area").val(imovel.area);
        $("#valor").val(imovel.valor);
        $("#descricao").val(imovel.descricao);
        $("#quartos").val(imovel.quartos);
    }

    $("#content-area").on("click", "#btn-alterar", function (){
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        alert(indice_selecionado);
        var url = 'edit.html?id='+ indice_selecionado + '&operacao=' + operacao; 
        window.open(url, self);

        var imovel = JSON.parse(colecaoImobiliaria[indice_selecionado]);
            $(".id").disabled = true;
            $("#id").val(imovel.id);
            $("#finalidade").val(imovel.finalidade);
            $("#tipo").val(imovel.tipo);
            $("#titulo").focus(imovel.titulo);
            $("#categoria").val(imovel.categoria);
            $("#area").val(imovel.area);
            $("#valor").val(imovel.valor);
            $("#descricao").val(imovel.descricao);
            $("#quatos").val(imovel.quartos);
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

});
