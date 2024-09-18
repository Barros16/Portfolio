let menuVisible = false;

//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

// Scroll suave para la navegación entre secciones
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll suave al inicio cuando se hace clic en el botón
document.querySelector('.arriba').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        header.style.top = "-80px";
    } else {
        header.style.top = "0";
    }
    
    lastScrollTop = scrollTop;
});

// Eliminar el hash de la URL
window.addEventListener('load', function() {
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
    window.scrollTo(0, 0);
});

function descargarCV() {
    const link = document.createElement('a');
    link.href = 'docs/CV_CarlosBarroso.pdf';
    link.download = 'CV_CarlosBarroso.pdf';
    link.click();
}

function validarFormulario() {
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const tema = document.getElementById("tema").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    
    if (nombre === "") {
        alert("Por favor, ingresa tu nombre.");
        return false;
    }

    const telefonoRegex = /^[0-9]{9}$/;
    if (!telefonoRegex.test(telefono)) {
        alert("Por favor, ingresa un número de teléfono válido.");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return false;
    }

    if (tema === "") {
        alert("Por favor, ingresa un tema.");
        return false;
    }

    if (mensaje === "") {
        alert("Por favor, escribe un mensaje.");
        return false;
    }

    return true; // Todo está correcto
}