function functionAjaxAdd(URL_PROCESO, TIPO, CONTENTTYPE, DATATYPE, datosaEnviar){
    $.ajax(
        {
            url: URL_PROCESO,
            type: "POST",
            data: datosaEnviar,
            contentType:"application/JSON",                 
            success:function(respuesta){
                alert("Si ha guardado");
                return true;
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                return false;
            }
        }
    );        
    
}