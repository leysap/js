//VARIABLES//
let gananciaTotal
let cantidadProducto
let totalMensual
let costoPackaging
let costoTransporte
let nombre
let precioProducto
let materiales
let manoDeObra
let productos
let datos
let siPackaging
let siTransporte
let teclado
let numero
let especiales
let teclado_especial
let parse
let total
let array_producto= [];
let objeto_string
let resultado
let string_resultado
let parse_ganancia
let jsonparse

//---VALIDACION CON RESPECTO AL FORMULARIO (USANDO JQUERY)//
$(document).ready(function(){

    let miFormulario = $("#formulario");
    miFormulario.on("submit", validarFormulario);
        
    function validarFormulario(e){
        
        e.preventDefault();
        //VERIFICO SI EN MIS INPUTS 'REQUIRED', ESTÁN COMPLETADOS PARA QUE SE ME ARME EL OBJETO//
        validarFormulario_dos()
        //SI DIO TRUE , OBTENGO LOS DATOS DEL USUARIO//
        datosUsuario();
        eventoSlideUp()
        //UNA VEZ COMPLETADO EL FORMULARIO, SE BORRA TODA LA INFORMACIÓN QUE EL USUARIO INGRESÓ PARA AGREGAR OTRO PRODUCTO//
        miFormulario.trigger("reset")
    }
    $("#borrar").on("click",() =>{

        eventoSlideUp()
    })
})

//VERIFICO QUE MIS INPUTS REQUIRED ESTEN COMPLETADOS PARA PODER CREAR MI OBJETO-PRODUCTO//
let length = document.getElementById("formulario").querySelectorAll("[required]").length
console.log(length)

function validarFormulario_dos(){
    for (let i = 0; i < length ; i++){
        let element = document.getElementById("formulario").querySelectorAll("[required]")[i]
    
        if (element.value == null || element.value.length == 0) {
            return false
        }
    }
    return true   
}

//VALIDACION DE MIS BUTTON RADIO//
let lenght_radio= document.getElementsByName("packaging").length
console.log(lenght_radio)

let lenght_transp = document.getElementsByName("transporte").length
console.log(lenght_transp)

function validarRadios(){
    for(let i=0; i< (lenght_radio && lenght_transp); i++){
        let elementRadio= document.getElementsByName("packaging")[i]
        let elementTransp = document.getElementsByName("transporte")[i]
        costoPackaging=document.getElementById("costoPackaging").value[i]
        costoTransporte=document.getElementById("costoTransporte").value[i]

        if((elementRadio.checked && costoPackaging==null) && (elementTransp.checked && costoTransporte==null)){
            showModal("ERROR AL CARGAR EN LA TABLA", "Por favor ingrese gasto de packaging y transporte. Vuelva a intentarlo")
            return false
        }
        if(elementRadio.checked && costoPackaging==null){
            showModal("ERROR AL CARGAR EN LA TABLA", "Por favor ingrese gasto del packaging. Vuelva a intentarlo")
            return false
        }
        if(elementTransp.checked && costoTransporte==null){
            showModal("ERROR AL CARGAR EN LA TABLA", "Por favor ingrese gasto de transporte. Vuelva a intentarlo")
            return false
        }
        return true
    }
}
//CREANDO MODAL(CON BOOTSTRAP) AL NO COMPLETAR EN EL CASO DE "SI"(PACKAGING O TRANSPORTE) EL COSTO//
var modalWrap= null;
const showModal=(a,b) => {
    if(modalWrap !==null){
        modalWrap.remove()
    }
    modalWrap = document.createElement('div');
    modalWrap.innerHTML=`<div class="modal fade" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">              
                                    <div class="modal-header">
                                        <h5 class="modal-title">${a}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>${b}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                                    </div>
                                </div>
                            </div>
                        </div> `;
    document.body.append(modalWrap);
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'))
    modal.show();
}

function eventoSlideUp(){
    $("#costoPackaging").slideUp("slow")
    $("#costoTransporte").slideUp("slow")
}

//VALIDACION DE INPUTS DE SOLO LETRAS O SOLO NUMEROS //
function solo_numeros(e){
    //Almacena la entrada del teclado//
    key=e.keyCode || e.which;
    //Almacena lo que haya en la entrada del teclado//
    teclado=String.fromCharCode(key);
    //La variable contiene los numeros válidos//
    numero=".0123456789";
    //Teclas que se van a ejecutar//
    especiales="8-13-37-38-46";

    teclado_especial=false;

    for(var i in especiales){
        if(key==especiales[i]){
            teclado_especial=true;
        }
    }
    //VERIFICO SI LO QUE SE CAPTURÓ SON SOLO NUMEROS//
    if(numero.indexOf(teclado)==-1 && !teclado_especial){
        return false;

    }
}
//Validacion input solo letras//
function solo_letras(e){

    key=e.keyCode || e.which;

    teclado=String.fromCharCode(key);
    //Variable que contiene las letras válidas ingresadas//
    letras=" abcdefghijklmnñopqrstuvwxyz";

    especiales= "8-37-38-46-164"

    teclado_especial=false;

    for(var i in especiales){
        if(key==especiales[i]){
            teclado_especial=true; 
            break;
        }
    }
    //VERIFICO SI LO QUE SE CAPTURO SON SOLO LETRAS//
    if(letras.indexOf(teclado)==-1 && !teclado_especial){
        return false;
    }
}

//---------- FUNCIONES PARA CAPTURAR LOS DATOS DEL USUARIO USANDO JQUERY//
function datosUsuario(){
    nombre = $("#nombreProducto").val().toUpperCase()
    precioProducto = $("#precioProducto").val()
    materiales= $("#materiales").val()
    manoDeObra = $("#manoDeObra").val()
    costoPackaging= $("#costoPackaging").val()
    costoTransporte= $("#costoTransporte").val()
    cantidadProducto = $("#cantidadProducto").val()

    siPackaging= $("#siPackaging").is(":checked")
    noPackaging= $("#noPackaging").is(":checked")
    noTransporte = $("#noTransporte").is(":checked")
    siTransporte= $("#siTransporte").is(":checked")
   
    //VERIFICACION DEL RADIO BUTTON, PARA TOMAR EL VALOR DEL INPUT //
    if(siPackaging && siTransporte){
        
        gananciaTotal = precioProducto - costoPackaging - costoTransporte - materiales -manoDeObra

    }else if(siPackaging && noTransporte){
        
        costoTransporte="" + "-"
        gananciaTotal= precioProducto - costoPackaging-  materiales - manoDeObra

    }else if(noPackaging && siTransporte){
        
        costoPackaging="" + "-"
        gananciaTotal= precioProducto - costoTransporte - materiales - manoDeObra

    }else if(noPackaging && noTransporte){

        costoPackaging="" + "-"
        costoTransporte="" + "-"
        gananciaTotal= precioProducto - materiales - manoDeObra
    }

    totalMensual= gananciaTotal * cantidadProducto

}

//FUNCIONES PARA OCULTAR O MOSTRAR EL INPUT AL DAR CLICK EN LOS RADIO BUTTONS //
function radio_pack(miRadio) {
    if (miRadio.value == 0) $("#costoPackaging").slideUp("fast")
    else $("#costoPackaging").slideDown("slow")    
}
function radio_transport(miRadio){
    if (miRadio.value == 2) $("#costoTransporte").slideUp("fast")  
    else $("#costoTransporte").slideDown("slow")
}

//MI OBJETO-PRODUCTO//
class Producto{

    constructor(nombre,precioProducto,materiales,manoDeObra,costoPackaging,costoTransporte,gananciaTotal,cantidadProducto,totalMensual){
    
        this.nombre=  nombre
        this.precioProducto= precioProducto
        this.materiales=materiales
        this.manoDeObra=manoDeObra
        this.costoPackaging=costoPackaging
        this.costoTransporte=costoTransporte
        this.gananciaTotal=gananciaTotal
        this.cantidadProducto= cantidadProducto
        this.totalMensual=totalMensual
    }
} 

//BOTON AGREGAR PRODUCTO (UTILIZANDO JQUERY)//
$(document).ready(function(){
    
    $("#calcular").on("click", calculo);

    function calculo(){
        //SI EN LOS INPUTS REQUIRED ESTAN COMPLETADOS(TRUE), SE ARMAN LOS OBJETOS//
        if(validarFormulario_dos() && validarRadios()){
            $(".boton-arriba").slideDown("slow")
            //VERIFICO SI EN MI STORAGE TENGO DATOS GUARDADOS, Y SI ES ASI, LOS OBTENGO// 
            if(sessionStorage.getItem("objeto") && sessionStorage.getItem("ganancia")){
                //OBTENGO LA INFORMACION GUARDADA EN MI STORAGE//
                jsonparse= JSON.parse(sessionStorage.getItem("objeto"))

                //LLAMO A MI FUNCION OBJETOS()//
                objetos(jsonparse)
               
            }else{
                
                objetos(array_producto)
            }
        }
    }
})


//OBTENGO LOS DATOS DEL USUARIO, ARMO EL OBJETO, LO AGREGO A UN ARRAY Y LUEGO LOS VISUALIZO AL HTML//
function objetos(array_producto){
    //OBTENGO LOS DATOS DE LOS INPUTS//
    datosUsuario();
    //LE DOY VIDA AL OBJETO//
    productos = new Producto(nombre,precioProducto,materiales,manoDeObra,costoPackaging,costoTransporte,gananciaTotal,cantidadProducto,totalMensual)
    //AGREGO EL OBJETO AL ARRAY//
    array_producto.push(productos)
    //ALMACENO EL ARRAY AL SESSIONSTORAGE//
    storage_productos(array_producto)

    //DOM: VISUALIZO LOS DATOS AL HTML //    
    $("#tabla_productos").append(`<tr> 
                                    <td> ${productos.nombre} </td> 
                                    <td> ${productos.precioProducto} </td> 
                                    <td> ${productos.materiales} </td> 
                                    <td> ${productos.manoDeObra} </td> 
                                    <td> ${productos.costoPackaging} </td> 
                                    <td> ${productos.costoTransporte} </td> 
                                    <td> ${productos.gananciaTotal} </td> 
                                    <td> ${productos.cantidadProducto} </td> 
                                    <td> ${productos.totalMensual} </td> 
                                    <td><button onclick='eliminar_producto(this)'>Eliminar</button></td>
                                </tr>`);
}

//ALMACENO EL ARRAY DE OBJETO AL STORAGE//
function storage_productos(array_producto){
    //CADA OBJETO SE GUARDA EN EL STORAGE//
    objeto_string = JSON.stringify(array_producto);
    sessionStorage.setItem("objeto", objeto_string);

    resultado=0
    parse = JSON.parse(sessionStorage.getItem("objeto"))
   
    //ITERO LOS 'TOTAL MENSUAL' DE CADA OBJETO PARA CALCULAR LA GANANCIA TOTAL DE PRODUCTOS EN UN MES//
    for(let i in parse){

        resultado += parse[i].totalMensual
    }

    //EL TOTAL SE AGREGA EN MI TFOOT//
    total = document.getElementById("total")
            total.innerHTML =  resultado 

    //EL TOTAL LO GUARDO EN EL STORAGE//
    string_resultado= JSON.stringify(resultado);
    sessionStorage.setItem("ganancia", string_resultado)
}

//RENDERIZO TODA LA INFORMACION GUARDADA EN MI STORAGE //
if(sessionStorage.getItem("objeto") && sessionStorage.getItem("ganancia")){

    document.addEventListener("DOMContentLoaded", function(){
    
        const parseando= JSON.parse(sessionStorage.getItem("objeto"))
        for(let element of parseando){
            $("#tabla_productos").append(`<tr> 
                                            <td> ${element.nombre} </td> 
                                            <td> ${element.precioProducto} </td> 
                                            <td> ${element.materiales} </td> 
                                            <td> ${element.manoDeObra} </td> 
                                            <td> ${element.costoPackaging} </td> 
                                            <td> ${element.costoTransporte} </td> 
                                            <td> ${element.gananciaTotal} </td> 
                                            <td> ${element.cantidadProducto} </td> 
                                            <td> ${element.totalMensual} </td> 
                                            <td><button onclick='eliminar_producto(this)'>Eliminar</button></td>
                                        </tr>`);
        };
        parse_ganancia = JSON.parse(sessionStorage.getItem("ganancia"))
        total = document.getElementById("total")
        total.innerHTML =  parse_ganancia
    })
}

//BOTON ELIMINAR PRODUCTO//
function eliminar_producto(elemento){
    //BORRO LO QUE SE ME HABIA GUARDADO EN EL STORAGE Y LO ACTUALIZO AL ELIMINAR UN SOLO PRODUCTO//
    sessionStorage.removeItem("ganancia")

    //RETIRO EN EL ARRAY EL OBJETO, REALIZO LA RESTA Y ACTUALIZO EL RESULTADO EN MI TABLA//
    jsonparse= JSON.parse(sessionStorage.getItem("objeto"))
    jsonparse.splice(elemento.parentElement.parentElement.rowIndex-1,1)
    resultado = document.getElementById("total").innerHTML =  document.getElementById("total").innerHTML - elemento.parentElement.parentElement.getElementsByTagName("td")[8].innerHTML;

    //VUELVO A GUARDAR EL OBJETO EN EL STORAGE//
    objeto_string = JSON.stringify(jsonparse);
    sessionStorage.setItem("objeto", objeto_string)

    //GUARDO EL NUEVO RESULTADO AL STORAGE//
    string_resultado= JSON.stringify(resultado);
    sessionStorage.setItem("ganancia", string_resultado)

    //ELIMINO LA FILA//
    elemento.parentElement.parentElement.remove() 
}

//UTILIZANDO JQUERY PARA MODIFICAR ESTILOS Y APLICAR EVENTOS//
$("body").css("background-color", "#4F8A8B")
$("#tabla").css("background-color", "rgb(238, 231, 222)")
$("#borrar").css("color", "black")
$(".div").css("background-color", "#FFCB74")

$(document).ready(function(){
    
	$("#calcular, #borrar").mouseover(function(){
        $(this).css({"background-color": "#4F8A8B",
                                "color": "#FFCB74"})
  	});
    $("#calcular,#borrar").mouseout(function(){
        $(this).css({"background-color": "rgb(238, 231, 222)",
                                "color": "black"})
  	});
    $("h1").mouseover(function(){

        $(this).css({ "background-color": "#252323",
                        "color":"#ffbd59",
        })
    })
    $("h1").mouseout(function(){
        $(this).css({ "background-color": "rgb(238, 231, 222)",
                        "color":"black"})
    })
    $("h1").on('dblclick',function(){
        $("h1") .slideUp(2000)
                .delay(500)
                .slideDown(2000)
    });
    $("#divisas, #ocultar, #tablaObjetos").mouseover(function(){

        $(this).css({"background-color": "#FFCB74",
                                "color": "#4F8A8B"} )
    })
    $("#divisas, #ocultar, #tablaObjetos").mouseout(function(){

        $(this).css({"background-color": "rgb(238, 231, 222)",
                                "color": "black"})
    })
    
    $("#tablaObjetos").on('click',()=>{
        $('#tabla').fadeToggle()
    })
    $("#tituloInformacion").mouseover(function(){

        $(this).css({"background-color": "#252323",
                       "color": "#ffbd59"})
    })
    $("#tituloInformacion").mouseout(function(){

        $(this).css({"background-color": "rgb(238, 231, 222)",
                       "color": "black"})
    })
    $("#enlaceQuienes").on("click", function(){

        $("#quienesSomos").fadeIn(1500)


    })
});



//UTILIZACION DE AJAX CON JQUERY//
const url= "https://v6.exchangerate-api.com/v6/1b1ab0b22f79ba1b0820c0a2/latest/ARS"
const urlpaises= "./scriptjson.json"

$(document).ready(function(){
    $("#divisas").click(() =>{
        $("li").remove()
        $("h2").remove()
        $("p").remove()
        //AGREGANDO ESTILOS A LOS NUEVOS COMPONENTES//
        $("#resultado-paises, #resultado, #div-tasas").slideDown("slow");
        $("#resultado-paises, #resultado").css({"background-color": "#FFCB74",
                                                "padding": "2em",
                                                "border": "1px solid white",
                                                "border-radius": "2em"})
        $("#div-tasas").css({"color": "#FFCB74",
                             "padding": "1em",})
    
        const api= new XMLHttpRequest()
        api.open('GET', url, true)
        api.send()

        api.onreadystatechange = function(){

            if (this.status == 200 && this.readyState==4){
                let datos = JSON.parse(this.responseText)
                console.log(datos)
                console.log(datos.conversion_rates)
                console.log(datos.time_last_update_utc)
                $("#div-tasas").prepend(`<h2> TASAS DE CAMBIO</h2>
                                         <p>( ${datos.time_last_update_utc} || ${datos.time_next_update_utc})</p>`)
                $("#resultado").prepend(`<li>ARS: ${datos.conversion_rates.ARS}</li>
                <li> EUR: ${datos.conversion_rates.EUR}</li>
                <li> UYU: ${datos.conversion_rates.UYU}</li>
                <li> USD: ${datos.conversion_rates.USD}</li>
                <li> CLP: ${datos.conversion_rates.CLP}</li>
                <li> BOB: ${datos.conversion_rates.BOB}</li>
                <li> AUD: ${datos.conversion_rates.AUD}</li>
                <li> CAD: ${datos.conversion_rates.CAD}</li>
                <li> COP: ${datos.conversion_rates.COP}</li>
                <li> BRL: ${datos.conversion_rates.BRL}</li>`)
            }
        }
   
        $.getJSON(urlpaises, function (respuesta, estado) {
            if(estado === "success"){
                $("#resultado-paises").prepend(`<li>ARS: ${respuesta.ARS}</li>
                                        <li> EUR: ${respuesta.EUR}</li>
                                        <li> UYU: ${respuesta.UYU}</li>
                                        <li> USD: ${respuesta.USD}</li>
                                        <li> CLP: ${respuesta.CLP}</li>
                                        <li> BOB: ${respuesta.BOB}</li>
                                        <li> AUD: ${respuesta.AUD}</li>
                                        <li> CAD: ${respuesta.CAD}</li>
                                        <li> COP: ${respuesta.COP}</li>
                                        <li> BRL: ${respuesta.BRL}</li>`)
              console.log(respuesta.ARS)
            }
        });
    })
    
    $('#ocultar').on('click',()=>{
    
        $("#resultado-paises, #resultado, #div-tasas").slideUp("slow");
        $("li").remove()
        $("h2").remove()
        $("p").remove()
    
    })
})

