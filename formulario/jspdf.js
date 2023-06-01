/* var inputIds = [document.getElementById('inp-entidad'), document.getElementById('inp-domicilio'), document.getElementById('inp-nombreapellido'), document.getElementById('inp-telefono'), document.getElementById('inp-localidad'), document.getElementById('inp-dni')];
bgas=[],

inputIds.forEach((el, indx) =>{
    el.style.backgroundColor = "white";
    el.addEventListener('change', function(){
      el.style.backgroundColor = "grey";
      bgas[indx] = el.Value;
      console.log(bgas);
    });
}); */

async function generarPDF() {
    document.getElementById("btn-pdf").innerHTML = "Descargarndo"

    //----------
    var descarga = document.getElementById("imprimir");
    var doc = new jsPDF('p', 'pt', 'letter');
    var margin=10;
  
   
    doc.html(document.body, {
        x: margin,
        y: margin,
        html2canvas: {
           // scale: scale,
        },
        callback: function(doc){
            doc.output('dataurlnewwindow', {filename: 'formulario.pdf'});
        }
    });
    

    await html2canvas(descarga, {
        width: 550 
    } )

    doc.save("Documento.pdf")
    //---------
    document.getElementById("btn-pdf").innerHTML = "haz click para descargar"
}