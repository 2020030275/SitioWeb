import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"


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
const auth = getAuth();

let usuario =""
let contraseña = ""


function leerUsuario(){
    usuario = document.getElementById('usuario').value
    contraseña = document.getElementById('contraseña').value

}

let btnIniciarSesion = document.getElementById('btnIniciarSesion')

function iniciarSesion(){

    leerUsuario()
    signInWithEmailAndPassword(auth,usuario,contraseña).then((userCredential)=>{
        const user = userCredential.user
        alert("Inicio de sesion")
        window.location.href="http://127.0.0.1:5500/html/admin.html"
    }).catch((error) =>{
        if(error.code == 'auth/invalid-email' || error.code == 'auth/wrong-password'){
            alert('Usuario o contraseña incorrectos')
        }else{
            alert("Surgio un error "+error)
        }
    })


}

if(btnIniciarSesion){
    btnIniciarSesion.addEventListener('click', (e)=>{
        e.preventDefault()
        iniciarSesion()
})
}