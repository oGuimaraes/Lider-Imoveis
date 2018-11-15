$(function(){

    var colecaoImobiliaria = localStorage.getItem("colecaoImobiliaria");

    colecaoImobiliaria = JSON.parse(colecaoImobiliaria);

    if(colecaoImobiliaria == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		colecaoImobiliaria = [];
    
        function adicionar(){
            var imov = getImovel("codigo", $("#id").val()); // cli
            
            //* Se ID já é existente
            if(imov != null){
                alert("Código já cadastrado.");
                return;
            }

            //* var imovel = cliente
            var imovel = JSON.stringify({ 
                codigo     : $("#id").val(),
                finalidade : $("#finalidade").val(),
                tipo       : $("#tipo").val(),
                titulo     : $("#titulo").val(),
                categoria  : $("#categoria").val(),
                area       : $("#area").val(),
                valor      : $("#valor").val(),
                descricao  : $("#descricao").val(),
                quartos    : $("#quatos").val()
            });

        
            colecaoImobiliaria.push(imovel); //* novo imovel é adicionado á coleção 'colecaoImobiliaria' do localStorage.
            localStorage.setItem("colecaoImobiliaria", JSON.stringify(colecaoImobiliaria));

            alert("Registro adicionado.");
            return true;
        };

        function listar(){
            $("#tblListar").html("");
            $("#tblListar").html(
                "<thead>"+
                "	<tr>"+
                "<th></th>"+
                "	<th>Código</th>"+
                "	<th>Nome</th>"+
                "	<th>Telefone</th>"+
                "	<th>Email</th>"+
                "	</tr>"+
                "</thead>"+
                "<tbody>"+
                "</tbody>"
                );
    
                for(var i in tbClientes){
                var cli = JSON.parse(tbClientes[i]);
                  $("#tblListar tbody").append("<tr>"+
                                              "	<td><img src='edit.png' alt='"+i+"' class='btnEditar'/><img src='delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
                                             "	<td>"+cli.Codigo+"</td>" + 
                                             "	<td>"+cli.Nome+"</td>" + 
                                             "	<td>"+cli.Telefone+"</td>" + 
                                             "	<td>"+cli.Email+"</td>" + 
                                               "</tr>");
            }
        }

    var formCadastro = document.getElementById('form');

    formCadastro.addEventListener("submit", function(event){
        event.preventDefault();
        return adicionar();
    });


    function getImovel(propriedade, valor){
		var imov = null;
        for (var item in colecaoImobiliaria) {
            var i = JSON.parse(colecaoImobiliaria[item]);
            if (i[propriedade] == valor)
                imov = i;
        }   
        return imov;
	}


    alert("Oi");
    //localStorage.clear();

});
