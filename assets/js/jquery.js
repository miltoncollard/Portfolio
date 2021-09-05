$(() =>{
    const URLGET = "https://jsonplaceholder.typicode.com/posts",
          infoPost = {"nombre":"",
                      "email":"",
                      "proyecto":"",
                      "mensaje":""
                    }
        
    console.log(infoPost)
    $('#form-btn').append('<button id="btn1"> Enviar </button>');
    
    $('#btn1').click(function(e){
        e.preventDefault();
    })

    $('#btn1').click(()=>{

        infoPost.nombre = $("#form-name").val()
        infoPost.email = $("#form-email").val()
        infoPost.proyecto = $("#form-project").val()
        infoPost.mensaje = $("#form-message").val()
        console.log(infoPost)

        $.post(URLGET,infoPost);  
    });  

    $('#btn1').click(()=>{

        $.post(URLGET,infoPost, (respuesta, estado) =>{
            if(estado === "success"){
                $(".contact__form").append(`<div class="success__message" id="success-msg"> 
                        Estimado/a: ${respuesta.nombre} , Su mensaje ha sido enviado 
                        </div>`);
            }
        })

        $("#form-name").val('');
        $("#form-email").val('');
        $("#form-project").val('');
        $("#form-message").val('');

        setTimeout(function(){
            $("#success-msg").fadeOut(2000);
            
        },3000);

        $("#success-msg").remove();
    });  

});