window.onload = function(){
    document.getElementById('files').addEventListener('change', function() {
        document.getElementById("text").innerHTML = this.files[0].name;
    });
}