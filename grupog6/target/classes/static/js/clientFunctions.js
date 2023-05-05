let URL_SERVICE = "https://gcf48a8db4572a5-bdinstanciaapexg6n.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client";


function addClient(){

    let myData = {  id: $("#id").val(), 
                name: $("#name").val(), 
                email:$("#email").val(), 
                age: $("#age").val(),
            };

    let mydatatoSend = JSON.stringify(myData);   
    
    $.ajax(
        {
            url: URL_SERVICE,
            type: "POST",
            data: mydatatoSend,
            contentType:"application/JSON",                 
            success:function(respuesta){
                alert("Si ha guardado");
                clearScreen();
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            }
        }
    );        
}

function listClient(){
    $.ajax(
        {
            url: URL_SERVICE,
            type: "GET",
             datatype:"JSON",
            success:function(respuesta){
                clearScreen();
                drawTable(respuesta.items);
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            }
        }
    );  

}

function drawTable(items){
   let myTable = "<table border= 1>"
        myTable = myTable + "<thead>"

        myTable = myTable + "<td>" + "id"     +"</td>"
        myTable = myTable + "<td>" + "name"     +"</td>"
        myTable = myTable + "<td>" + "email"     +"</td>"
        myTable = myTable + "<td>" + "Age"     +"</td>"
        myTable = myTable + "<td>" + "Opciones"     +"</td>"

        myTable = myTable + "</thead>"

    for (cnt = 0; cnt < items.length; cnt++){
        myTable = myTable + "<tr>"

        myTable = myTable + "<td>" + items[cnt].id     +"</td>"
        myTable = myTable + "<td>" + items[cnt].name     +"</td>"
        myTable = myTable + "<td>" + items[cnt].email     +"</td>"
        myTable = myTable + "<td>" + items[cnt].age     +"</td>"
        myTable = myTable + "<td> <button onclick='delClient("+items[cnt].id+")'>Borrar</button>";
        myTable = myTable + "<td> <button onclick='getOneClient("+items[cnt].id+")'>Editar</button>";
        myTable = myTable + "</tr>"
    }
    
    myTable = myTable + "</table>"
    $("#resultado").append(myTable);
}



function clearScreen(){
    $("#id").val("");
    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
    $("#resultado").empty();
   
}

function updClient(){
    myData = {  id: $("#id").val(), 
                name: $("#name").val(), 
                email:$("#email").val(), 
                age: $("#age").val(),
            };
    let mydatatoSend = JSON.stringify(myData);            

    $.ajax(
        {
            url: URL_SERVICE,
            type: "PUT",
            data: mydatatoSend,
            contentType:"application/JSON",            
            success:function(respuesta){
                alert("Si ha MODIFICADO");
                clearScreen();
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            }
        }
    ); 
}

function delClient(idaBorrar){
    let myData = {  id: idaBorrar};

    let mydatatoSend = JSON.stringify(myData);

    $.ajax(
        {
            url: URL_SERVICE,
            type: "DELETE",
            data: mydatatoSend,
            contentType:"application/JSON",
            success:function(respuesta){
                alert("Si ha Eliminado");
                clearScreen();
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            }
        }
    );        

}

function getOneClient(idaConsultar){
        $.ajax(
        {
            url: URL_SERVICE+"/"+idaConsultar,
            type: "GET",
             datatype:"JSON",
            success:function(respuesta){
                screentoModify(respuesta.items);
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            }
        }
    );  
   
}

function screentoModify(items){
    $("#id").val(items[0].id);
    $("#name").val(items[0].name);
    $("#email").val(items[0].email);
    $("#age").val(items[0].age);
}