$(function () {

    var colecaoImobiliaria = localStorage.getItem("colecaoImobiliaria");
    //localStorage.setItem('colecaoImobiliaria', $("#form").html());
    colecaoImobiliaria = JSON.parse(colecaoImobiliaria);
    listar();

    if (colecaoImobiliaria == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        colecaoImobiliaria = [];

    function adicionar() {
        var imov = getImovel("codigo", $("#id").val()); // cli

        //* Se ID já é existente
        if (imov != null) {
            alert("Código já cadastrado.");
            return;
        }
        
        if ( $("#titulo").val() == "" ){
            var placeholder = document.getElementById("titulo").placeholder;
            $("#titulo").val(placeholder);    
        }

        if ( $("#area").val() == "" ){
            var placeholder = document.getElementById("area").placeholder;
            $("#area").val(placeholder);    
        }

        if ( $("#valor").val() == "" ){
            var placeholder = document.getElementById("valor").placeholder;
            $("#valor").val(placeholder);    
        }

        if ( $("#descricao").val() == "" ){
            var placeholder = document.getElementById("descricao").placeholder;
            $("#descricao").val(placeholder);    
        }

        if ( $("#quartos").val() == "" ){
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
            quartos: $("#quatos").val()
        });

        colecaoImobiliaria.push(imovel); //* novo imovel é adicionado á coleção 'colecaoImobiliaria' do localStorage.
        localStorage.setItem("colecaoImobiliaria", JSON.stringify(colecaoImobiliaria));

        var placeholder = document.getElementById("titulo").placeholder;
        alert(placeholder);

        alert("Registro adicionado.");
        return true;
    };

    function listar() {

        //$("#content-area").html("");
        console.log(colecaoImobiliaria);
        for (var i in colecaoImobiliaria) {
            console.log(i);
            var imovel = JSON.parse(colecaoImobiliaria[i]);
            console.log(imovel);
            $("#content-area").append("<div class='item-lista col-sm'><div class='imagem'></div>" +
                "<div class='info'>" +
                "<span class='titulo'>" + imovel.titulo + "</span>" +
                "</br>" +
                "<span class='descricao' >" + imovel.descricao + "</span>" +
                "</br>" +
                "<div class='section'>" +
                "<span class='preco'> R$ " + imovel.valor + "</span>" +
                "<div class='btn btn-warning'>Ver detalhes</div>" +
                "</div>" +
                "</div>");
        }
    }

    var formCadastro = document.getElementById('form');

    /*
    formCadastro.addEventListener("submit", function (event) {
        event.preventDefault();
        return adicionar();
    });
    */

    $("#form").on("submit", function () {
        event.preventDefault();
        return adicionar();
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
    //localStorage.clear();

});
