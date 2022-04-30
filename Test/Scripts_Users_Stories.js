

// En este documento se muestran las funciones principales, para el respectivo funcionamiento se requieren las llaves de acceso a firebase por ende estos fragmentos de código, corresponde a las funciones según historias de usuario.
// se describe funcionamiento en cada comentario.


//Historia 1 Login al sistema 
function Ingreso() {
    var email = document.getElementById('email').value;
    var contraseña = document.getElementById('pass').value;

    firebase.auth().signInWithEmailAndPassword(email, contraseña)
        .then((userCredential) => {
            // Signed in
             
            var user = userCredential.user;

            ver(); // con este metodo me logeo 
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o contraseña incorrectos!',
                
              }).error.message

           
        });
}

// Historia de usuario 2, Se valida en la DB y si pasa la validación se permite Ingreso
function ver() { //etodo que se llma despues desde login 
    
    window.location = "views/home.php";// esta función se ejecuta en Historia de usuario 1

}

//Historia de usuario 3, 
//La historia de usuario 3 está conformada por ventas modal que al presionar clic mostrará una información 
//El CONTENIDO DE ESTA HISTORIA DE USUARIO SE ENCUENTRA EN:E:\Materias Iberoamericana\Proyecto de Software\Planificación\Test\Intructivo_modal.php


//Historia de Usuario 4, ir al módulo de estudiantes
<script src="<?php echo JS . 'estudiantes.js' ?>"></script> // Al hacer clic en el boton estudiantes construido en front, direcciona a una url predefinida 
//que lleva al módulo de estudiantes

//Historia de usuarios # 5, registrar un estudiante para visualizarlo en el módulo de estudiantes 

function guardarEstu() {
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // obtener el valor de los campo
        const documento = registerForm["Documento"].value;
        const nombres = registerForm["Nombres"].value;
        const apellido1 = registerForm["Apellido1"].value;
        const apellido2 = registerForm["Apellido2"].value;
        const grado = registerForm["Grado"].value;
        const jornada = registerForm["Jornada"].value;
        const rh = registerForm["Rh"].value;
        const acudiente = registerForm["Acudiente"].value;
        const direccion = registerForm["Direccion"].value;
        const zona = registerForm["Zona"].value;
        // Criterios: validación de campos vacios
        if (
          documento == "" || nombres == "" ||apellido1 == "" ||grado == "" ||jornada == "" ||rh == "" ||acudiente == "" ||direccion == "" ||zona == ""
        ) {
          Swal.fire({
            title: "Oops...",
            text: "Existen campos vacios!",
          });
          return false;
        } else {
         
      
          // carga de usuario a db
       
          const registerStudent = studentRef.push(); 
         
          const ref = firebase.database().ref('students'); 
         
          ref.orderByChild('Documento').on('child_added', (snapshot) => {
          
            var a = snapshot.val().Documento; 
             let flag=false;
            arrayDocumento.push(a);
           
            
             console.log(arrayDocumento);
            
             for (let i= 0; i < arrayDocumento.length; i++) {
              console.log(i);
              if(arrayDocumento[i]==documento){
                console.log(arrayDocumento[i]);
                
                flag=true;
                
            
              }
             }
            
       
  
             if(flag){
           
             Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El estudiante ya está registrado!',
             
            })
          }else{
            studentRef.push()
            if(studentRef){
              registerStudent.set({
                Uid: registerStudent.key,
                Documento: documento,
                Nombres: nombres,
                Apellidos1: apellido1,
                Apellidos2: apellido2,
                Grado: grado,
                Jornada: jornada,
                Rh: rh,
                Acudiente: acudiente,
                Direccion: direccion,
                Zona: zona,
              });
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Usuario registrado con éxito",
                showConfirmButton: false,
                timer: 1500,
              });
              limpiarFormulario();
            }
             
          }
         
          });
         
    
        }
        // mensaje de guardado
       
      });
    }
  }
  guardarEstu();

// Criterios:  Mostrar el estudiante  depués de registrarlos

// carga de estudiantes a interfaz
window.addEventListener("DOMContentLoaded", async (e) => {
    studentsTable.innerHTML = ``;
    await studentRef.on("value", (students) => {
      studentsTable.innerHTML = ``;
      students.forEach((student) => {
        let studentData = student.val();
        studentsTable.innerHTML += `<tr>
  
        <th>#</th>
        <td>${studentData.Documento}</td>
        <td>${studentData.Nombres}</td>
        <td>${studentData.Apellidos1}</td>
        <td>${studentData.Apellidos2}</td>
        <td>${studentData.Grado}</td>
        <td>${studentData.Jornada}</td>
        <td>${studentData.Rh}</td>
        <td>${studentData.Acudiente}</td>
      <td>${studentData.Direccion}</td>
        <td>${studentData.Zona}</td>
  
      <td>

     <!--Criterios Botones eliminar y editar-->


       <button   class="boton_editar" data-id="${studentData.Uid}">
        <i class="fas fa-pencil-alt"data-id="${studentData.Uid}"></i>
        </button>
       <button   class="boton_eliminar" data-id="${studentData.Uid}">
        <i class="fas fa-trash-alt " data-id="${studentData.Uid}"></i>
        
         </button>
  
      </td>
     </tr>`;

    });
});
});


// Historia 6, Módulo crear Rutas 
// se carga Lógica de módulo con sus funciones según los criterios definidos

var Arraydireccion =[];
var ArrayReferenciaRuta=[];

const studentsTable = document.getElementById("student-table"); //ESTUDIANTES

const rutaForm = document.getElementById("ruta-form");//formulario de rutas
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// carga de rutas
const rutaRef = firebase.database().ref("rutas"); //rutas
// carga de estudiantes a interfaz
const studentRef = firebase.database().ref("students"); //ESTUDIANTES
const selectStudents = (uid) => {
  firebase.database().ref(`students/${uid}/Direccion`);
};


//Estudiantes sin asignar a  una ruta se muestran en una tabla Datatabble:


var db= firebase.database();
var coleccionRutas = db.ref().child('students');
var dataSet = [];//array para guardar los valores de los campos inputs del form
    var table = $('#student-table').DataTable({
      language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Estudiantes",
        "infoEmpty": "Mostrando 0 to 0 of 0 Estudiantes",
        "infoFiltered": "(Filtrado de _MAX_ total Estudiantes)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Estudiantes",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
      },
      
      pageLength : 10,
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
      data: dataSet,
      columnDefs: [
          {
              targets: [0], 
              visible: false, //ocultamos la columna de ID que es la [0]                        
          },
          {
              targets: -1,        
              render: function (data, type, row, meta) {
                return" <input onclick='clickAgregarDireccion(this)'  style='margin-left:40px;' class='form-check-input' type='checkbox' value='"+row[4]+"' id='seleccionCheck'/>"
             } 
          }

     
      ]	   
  });


// Clic en estudiantes para agregarlos a una ruta 
coleccionRutas.on("child_added", datos => {        
    dataSet = [datos.key, datos.child("Documento").val(), datos.child("Nombres").val(), datos.child("Zona").val(), datos.child("Direccion").val(), datos.child("Jornada").val()];
    table.rows.add([dataSet]).draw();
});


function clickAgregarDireccion(obj){
  
  let checkbox = $(obj);
  let direccion = checkbox.val();
  let waypoints = $('#waypoints');

     if(checkbox.prop("checked")){
      Arraydireccion.push(direccion)
      console.log(direccion);
     
     }else{
      Arraydireccion = eliminarElemento(Arraydireccion, direccion);

     }

     waypoints.val(Arraydireccion);          
     console.log("array: ",waypoints.val());
};

 let eliminarElemento=(arr ,item)=>{
  //console.log("array eliminar elemento: ",item);
   return arr.filter(elemento=>elemento !== item);
 }



 //Otros criterios, ver la ruta en el mapa 
 function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    /* const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);  */
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: { lat: 4.60971, lng: -74.08175 },
    });
    directionsRenderer.setMap(map);
    document.getElementById("submit").addEventListener("click", () => {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
  }
  
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const waypts = [];  
    //const checkboxArray = document.getElementById("waypoints");
    let checkboxArray = Arraydireccion
       
  
    // for (let i = 0; i < checkboxArray.length; i++) {
    for (let i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray[i]) {      
        waypts.push({
          location: checkboxArray[i],
          stopover: true,
        });
      }
    }
    console.log(waypts);
    directionsService.route(
      /* aqui lo correspondiente a waypoint */
      {
        origin: document.getElementById("start").value,
        destination: document.getElementById("end").value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === "OK" && response) {
          directionsRenderer.setDirections(response);
          const route = response.routes[0];
          const summaryPanel = document.getElementById("directions-panel");
          summaryPanel.innerHTML = "";
  
          // For each route, display summary information.
          for (let i = 0; i < route.legs.length; i++) {
            const routeSegment = i + 1;
            summaryPanel.innerHTML +=
              "\n Parada: " + routeSegment + "\n";
            summaryPanel.innerHTML += route.legs[i].start_address + " \n";
            summaryPanel.innerHTML += route.legs[i].end_address + "\n";
            summaryPanel.innerHTML += route.legs[i].distance.text + "\n";
          }
        } else {
          Swal.fire({
            title: "Oops...",
            text: "Una de las direcciones no está en el mapa o está incorrecta!",
          })+status;
          return false;
        }
      }
    );
  }
  




 // Historia de usuario 7, Guardar una ruta 

 function guardarRuta() {
    if (rutaForm) {
      rutaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // obtener el valor de los campo
        const ruta = rutaForm["Rutas"].value;
        const nombreRuta = rutaForm["NombreRuta"].value;
        const referenciaRuta = rutaForm["ReferenciaRuta"].value;
        const vehiculoRuta = rutaForm["VehiculoRuta"].value;
  
  
        // validación de campos vacios
        if (
          ruta == "" || nombreRuta == "" || referenciaRuta == "" || vehiculoRuta==""
        ) {
          Swal.fire({
            title: "Oops...",
            text: "Ruta no establecida!",
          });
          return false;
        } else {
          // carga de usuario a db
          const rutaForm = rutaRef.push();
  
          const ref = firebase.database().ref('rutas');
          ref.on('child_added', (snapshot, prevChildKey) => {
          
            var a = snapshot.val(); 
             let flag=false;
            ArrayReferenciaRuta.push(a.ReferenciaRuta, a.VehiculoRuta, a.NombreRuta);
           
            
             console.log(ArrayReferenciaRuta);
             for (let i= 0; i < ArrayReferenciaRuta.length; i++) {
              console.log(i);
              if(ArrayReferenciaRuta[i]== referenciaRuta || ArrayReferenciaRuta[i]==vehiculoRuta || ArrayReferenciaRuta[i]==nombreRuta){
                console.log(ArrayReferenciaRuta[i]);
                flag=true;
            
              }
             }
  
             if(flag){
           
              Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'El estudiante ya está registrado!',
              
             })
           }else{
            rutaRef.push();
             if(rutaRef){
              rutaForm.set({
                Uid: rutaForm.key,
                Ruta: ruta,
                NombreRuta:nombreRuta,
                ReferenciaRuta: referenciaRuta,
                VehiculoRuta: vehiculoRuta
               
              });
                 // mensaje de guardado
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Usuario registrado con éxito",
              showConfirmButton: false,
              timer: 1500,
            });
           
            limpiarFormulario()
             }
           
  
            
           }
  
  
  
          });
  
  
      
  
        }
     
      });
      
    }
  }
  guardarRuta()


  // Historia de Usuario 8, ver rutas creadas en Interfaz Home Con sus respectivos Criterios.

  // Función de data table
var db= firebase.database();
var coleccionRutas = db.ref().child('rutas');
var dataSet = [];//array para guardar los valores de los campos inputs del form
    var table = $('#myTable').DataTable({
      language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Rutas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Rutas",
        "infoFiltered": "(Filtrado de _MAX_ total Rutas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Rutas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
      },
                pageLength : 10,
                lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
                data: dataSet,
                columnDefs: [
                    {
                        targets: [0], 
                        visible: false, //ocultamos la columna de ID que es la [0]                        
                    },
                    {
                        targets: -1,        
                        defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button  onclick='probar()'  class='boton_editar' data-id='${rutaData.Uid}'><i class='fas fa-eye'></i></button><button  class='boton_editar' data-id='${rutaData.Uid}'><i class='fas fa-pencil-alt'data-id='${rutaData.Uid}'></i></button> </button> <button   class='boton_eliminar' data-id='${rutaDataUid}'><i class='fas fa-trash-alt ' data-id='${rutaData.Uid'><i></button></div></div>"  
                    }
                ]	   
            });

    coleccionRutas.on("child_added", datos => {        
        dataSet = [datos.key, datos.child("ReferenciaRuta").val(), datos.child("NombreRuta").val(), datos.child("VehiculoRuta").val()];
        table.rows.add([dataSet]).draw();
    });
    // 
    function probar(){
      $('#modalRutas').modal('show')
        console.log('si entra');
      
    }

    function cerrarModal(){
      $('#modalRutas').modal('hide')
    }

    // imprimir pantalla
    function impresionRuta(){
     window.print();
    }
    
    const deleteButtons = document.querySelectorAll(".boton_eliminar");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Estas seguro?',
          text: "Deseas eliminar ruta?!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, Eliminarla!',
          cancelButtonText: 'No, cancelar!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            seleccionarRutaCreada(e.target.dataset.id);
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'ruta eliminada.',
              'success'
            )
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Eliminación cancelada',
              
           
            )
          }
        })
        
      });
    });

