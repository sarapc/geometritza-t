window.onload = function(){
    document.getElementById('desa').addEventListener('click', desarUrl, false);
}

function desarUrl(){
    localStorage.setItem('urlModelEntrenat', document.getElementById('urlModelEntrenat').value);
    alert('Model entrenat desat correctament.');
}