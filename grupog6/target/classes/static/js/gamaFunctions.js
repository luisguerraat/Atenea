let URL_SERVICE = "https://gcf48a8db4572a5-bdinstanciaapexg6n.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/car/car";

function addCar(){

    let myData = {  id: $("#id").val(), 
                brand: $("#brand").val(), 
                model:$("#model").val(), 
                category_id: $("#category_id").val(),
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

function listCar(){
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
        myTable = myTable + "<td>" + "brand"     +"</td>"
        myTable = myTable + "<td>" + "model"     +"</td>"
        myTable = myTable + "<td>" + "categoryId"     +"</td>"
        myTable = myTable + "<td>" + "Opciones"     +"</td>"

        myTable = myTable + "</thead>"

    for (cnt = 0; cnt < items.length; cnt++){
        myTable = myTable + "<tr>"

        myTable = myTable + "<td>" + items[cnt].id     +"</td>"
        myTable = myTable + "<td>" + items[cnt].brand     +"</td>"
        myTable = myTable + "<td>" + items[cnt].model     +"</td>"
        myTable = myTable + "<td>" + items[cnt].category_id     +"</td>"
        myTable = myTable + "<td> <button onclick='delCar("+items[cnt].id+")'>Borrar</button>";
        myTable = myTable + "<td> <button onclick='getOneCar("+items[cnt].id+")'>Editar</button>";
        myTable = myTable + "</tr>"
    }
    
    myTable = myTable + "</table>"
    $("#resultado").append(myTable);
}



function clearScreen(){
    $("#id").val("");
    $("#brand").val("");
    $("#model").val("");
    $("#category_id").val("");
    $("#resultado").empty();
   
}

function updCar(){
    myData = {  id: $("#id").val(), 
                brand: $("#brand").val(), 
                model:$("#model").val(), 
                category_id: $("#category_id").val(),
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

function delCar(idaBorrar){
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

function getOneCar(idaConsultar){
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
    $("#brand").val(items[0].brand);
    $("#model").val(items[0].model);
    $("#category_id").val(items[0].category_id);
}