// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getDatabase, onValue,ref,set,child,get,update,remove } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { getStorage, ref as refS, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAF4sQsCL_-wMDjGlOqnL1s-XVbNsfQVn8",
    authDomain: "pizzascastillo-cfe80.firebaseapp.com",
    projectId: "pizzascastillo-cfe80",
    storageBucket: "pizzascastillo-cfe80.appspot.com",
    messagingSenderId: "637465691177",
    appId: "1:637465691177:web:e829dc29e9221de6d20838",
    databaseURL: "https://pizzascastillo-cfe80-default-rtdb.firebaseio.com/"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();
const storage = getStorage();


// Variables

// Admin
var id = "";
var nombreProducto = "";
var precioProducto = "";
var descripcionProducto = "";
var nombreImagen = "";
var urlImagen = "";
var estatus = 0;

//botones
var btnCerrarSesion = document.getElementById('btnCerrarSesion');
var btnInsertar = document.getElementById('btnInsertar');
var btnBuscar = document.getElementById('btnBuscar');
var btnActualizar = document.getElementById('btnActualizar');
var btnDeshabilitar = document.getElementById('btnDeshabilitar');
var btnLimpiar = document.getElementById('btnLimpiar');
var limpiarContacto = document.getElementById('limpiarContacto');
var btnMostrar = document.getElementById('btnMostrar');
var archivo = document.getElementById('imgFile');
var lista = document.getElementById('productos-admin');
var todo = document.getElementById('productos');

// Funciones
function leerInputs(){
    id = document.getElementById('txtId').value;
    nombreProducto = document.getElementById('txtNombre').value;
    precioProducto = document.getElementById('txtPrecio').value;
    descripcionProducto = document.getElementById('txtDescripcion').value;
    nombreImagen = document.getElementById('txtImagen').value;
    urlImagen = document.getElementById('urlImagen').value;
    estatus = document.getElementById('Estatus').value;
}

function cerrarSesion(){
    signOut(auth).then(() => {
        alert('Cerrado Exitosamente');
        window.location.href = "https://2020030275.000webhostapp.com/html/login.html"
    }).catch((error) => {
        console.log('Surgio un error' + error);
    });
}

if(window.location.href == "http://127.0.0.1:5500/html/admin.html"){
    window.onload = validarUsuario();    
}

if(window.location.href == "https://2020030275.000webhostapp.com//html/admin.html"){
    window.onload = validarUsuario();    
}



if(window.location.href == "http://127.0.0.1:5500/html/Productos.html"){
    window.onload = mostrarProductos();    
}


if(window.location.href == "http://127.0.0.1:5500/html/admin.html"){
    window.onload = mostrarProductos(); 
}

if(window.location.href == "https://2020030275.000webhostapp.com/html/Productos.html"){
    window.onload = mostrarProductos();    
}


if(window.location.href == "https://2020030275.000webhostapp.com/html/admin.html"){
    window.onload = mostrarProductos(); 
}





function validarUsuario(){
    onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        const nombre = user.email;
        alert('Usuario Valido')
    } else {
        document.getElementById('xd').style.display ="none"        
        document.getElementById('prohibido').innerHTML = "No tienes acceso"
        setTimeout(function(){
            window.location.href="/html/login.html";
        }, 3000);
        


    }
    });
}

function cargarImagen(){
    const file = event.target.files[0];
    const name = event.target.files [0].name;
    document.getElementById('txtImagen').value = name
    let id = document.getElementById('txtId').value;

    const storageRef = refS(storage, 'imagenes/' + id);

    uploadBytes(storageRef, file).then((snapshot)=>{
      alert('Se subio la imagen')
    })
    setTimeout(descargarImagen,3000);
  
  }

function descargarImagen(){
    let id = document.getElementById('txtId').value
    const storageRef = refS(storage, 'imagenes/' + id);
    // Get the download URL
    getDownloadURL(storageRef)
        .then((url) => {
        document.getElementById('urlImagen').value = url;
        document.getElementById('imagenProducto').src = url
        })
        .catch((error) => {
        switch (error.code) {
            case 'storage/object-not-found':
            console.log('No existe el archivo')
            break;
            case 'storage/unauthorized':
            console.log('No tiene permisos')
            break;
            case 'storage/canceled':
            console.log('Se cancelo o no tiene internet')
            break;
            case 'storage/unknown':
            console.log('Surgio al inesperado')
            break;
        }
        });
}

function insertarProducto(){
    leerInputs();
    set(ref(db,'productos/' + id),{
      nombreProducto : nombreProducto,
      precioProducto : precioProducto,
      descripcionProducto : descripcionProducto,
      urlImagen : urlImagen,
      estatus : estatus
    }).then((response) =>{
      alert("Se agrego el registro con exito")
      mostrarProductos();
    }).catch((error)=>{
      alert("Surgio un error " + error)
    })
    
}

function buscarProducto(){
    leerInputs();
    const dbref = ref(db);
    get(child(dbref, 'productos/'+ id)).then((snapshot) =>{
      if(snapshot.exists()){
        nombreProducto = snapshot.val().nombreProducto,
        precioProducto = snapshot.val().precioProducto,
        descripcionProducto = snapshot.val().descripcionProducto,
        urlImagen = snapshot.val().urlImagen,
        estatus = snapshot.val().estatus
        escribirInputs();
      }else{
        alert("No existe la matricula");
      }
    }).catch((error) =>{
        alert("Surgio un error " + error)
    })
  }

  function escribirInputs(){
    document.getElementById('txtId').value = id;
    document.getElementById('txtNombre').value = nombreProducto;
    document.getElementById('txtPrecio').value = precioProducto;
    document.getElementById('txtDescripcion').value = descripcionProducto;
    document.getElementById('urlImagen').value = urlImagen;
    document.getElementById('imagenProducto').src= urlImagen;
    document.getElementById('Estatus').value = estatus;
  }

function actualizarProducto(){
    leerInputs();
    update(ref(db, 'productos/' + id),{
        nombreProducto : nombreProducto,
        precioProducto : precioProducto,
        descripcionProducto : descripcionProducto,
        urlImagen : urlImagen,
        estatus : estatus
    }).then(()=>{
        alert("Se realizo actualizacion")
        mostrarProductos();
    }).catch((error)=>{
        alert("Surgio un error" + error)
    })  
}

function mostrarProductos(){
    if(lista != null){
        lista.innerHTML = "";
    }
    const dbref = ref(db, 'productos/');
    onValue(dbref, (snapshot)=>{
        snapshot.forEach(childSnapshot => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        if(lista){
            if(childData.estatus == 0){

                lista.innerHTML = lista.innerHTML + "<li><div class='card'> <div class='img'><img src='"+childData.urlImagen+"' alt='' height='100%' width='100%'> </div><div class='txt'> <h2>"+ 
                "(" + childData.estatus + ")"+childData.nombreProducto+"</h2> <h3 style='text-align: center;'>$"+childData.precioProducto+"</h3><p>"
                +childData.descripcionProducto+"</p> </div> </div> </li>"

            }
            if(childData.estatus == 1){
                lista.innerHTML = lista.innerHTML + "<li><div class='card'> <div class='img'><img src='"+childData.urlImagen+"' alt=''height='100%' width='100%'> </div><div class='txt'> <h2>"+ 
                "(" + childData.estatus + ")"+childData.nombreProducto+"</h2> <h3 style='text-align: center;'>$"+childData.precioProducto+"</h3><p>"
                +childData.descripcionProducto+"</p> </div> </div> </li>"
            }
        }
        if(todo){
            if(childData.estatus == 0){
                todo.innerHTML = todo.innerHTML + "<li><div class='card'> <div class='img'><img src='"+childData.urlImagen+"' alt='' height='100%' width='100%'> </div><div class='txt'> <h2>"+ 
                childData.nombreProducto+"</h2> <h3 style='text-align: center;'>$"+childData.precioProducto+"</h3><p>"
                +childData.descripcionProducto+"</p> </div> </div> </li>"

            }
        }
                                              
        });
    },{
        onlyOnce: true
    });

}

function deshabilitar(){
    leerInputs();
    if(estatus == 0){
        update(ref(db, 'productos/' + id),{
            estatus : 1
        }).then(()=>{
            alert("Se deshabilito")
            buscarProducto();
            escribirInputs();
            mostrarProductos();
        }).catch((error)=>{
            alert("Surgio un error" + error)
        })  
    }
    if(estatus == 1){
        update(ref(db, 'productos/' + id),{
            estatus : 0
        }).then(()=>{
            alert("Se habilito")
            buscarProducto();
            escribirInputs();
            mostrarProductos();
        }).catch((error)=>{
            alert("Surgio un error" + error)
        })  
    }
    
    
    

}

function limpiar(){
    id = "";
    nombreProducto = "";
    precioProducto = "";
    descripcionProducto = "";
    nombreImagen = "";
    urlImagen = "/img/icono.png";
    escribirInputs();
    document.getElementById('urlImagen').value = "";
    document.getElementById('txtImagen').value ="";  

}

function limpiarContactos(){
    document.getElementById('comentarios').value = "";
    document.getElementById('correo').value =""; 
    document.getElementById('nombre').value = "";
    
}

// Eventos
if(btnCerrarSesion){
    btnCerrarSesion.addEventListener('click',cerrarSesion);
}

if(btnInsertar){
    btnInsertar.addEventListener('click',insertarProducto);
}

if(btnDeshabilitar){
    btnDeshabilitar.addEventListener('click',deshabilitar);
}

if(btnLimpiar){
    btnLimpiar.addEventListener('click',limpiar);
}

if(btnActualizar){
    btnActualizar.addEventListener('click',actualizarProducto);
}

if(btnBuscar){
    btnBuscar.addEventListener('click',buscarProducto);
}

if(btnMostrar){
    btnMostrar.addEventListener('click',mostrarProductos);
}

if(archivo){
    archivo.addEventListener('change',cargarImagen);
}

if(btnCerrarSesion){
    btnCerrarSesion.addEventListener('click',cerrarSesion);
}

if(limpiarContacto){
    limpiarContacto.addEventListener('click', limpiarContactos)
}
