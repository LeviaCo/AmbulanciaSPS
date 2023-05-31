const formulario ={
    entidad:'',
    domicilio: '',
    nombreapellido: '',
    telefono: '',
    localidad: '',
    dni: ''
}

let isValido = false
let isEditando = false

function generarPDF(event){
    event.preventDefault() 

    validarCampos()

    
}

function validarCampos(){
    const inpEntidad = document.getElementById('inp-entidad').value  
    const inpDomicilio = document.getElementById('inp-domicilio').value 
    const inpNombreApellido = document.getElementById('inp-nombreapellido').value 
    const inpTelefono = document.getElementById('inp-telefono').value 
    const inpLocalidad = document.getElementById('inp-localidad').value 
    const inpDNI = document.getElementById('inp-dni').value 

    if(
        inpEntidad === '' ||
        inpDomicilio === '' ||
        inpNombreApellido === '' ||
        inpTelefono === '' ||
        inpLocalidad === '' ||
        inpDNI === ''
    ){
        alert('Se deben llenar todos los campos')
        isValido = false
    } else {
        isValido = true
    }
}