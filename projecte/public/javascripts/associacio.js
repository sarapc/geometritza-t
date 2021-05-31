var urlModelEntrenat = localStorage.getItem('urlModelEntrenat');
var modelEntrenat, urlModel, urlMetadata;

window.onload = function(){

    if(!urlModelEntrenat){
        urlModelEntrenat = "https://teachablemachine.withgoogle.com/models/i26temL9w/";
    }
    
    urlMetadata = urlModelEntrenat + "metadata.json";
    
    fetch(urlMetadata).then(resposta => resposta.json()).then(dades =>{

        var modelsEntrenats = document.getElementById('modelsEntrenats');

        dades.labels.forEach(file => {

            let inpt = document.createElement('input');

            inpt.id = 'modelEntrenat';
            inpt.type = 'radio';
            inpt.name = 'modelEntrenat';
            inpt.classList.add('modelEntrenat');
            inpt.value = file;

            let lbl = document.createElement('label');
            lbl.for = 'modelEntrenat';
            lbl.id = file;
            lbl.innerHTML = '&nbsp' + file;

            modelsEntrenats.append(inpt);

            modelsEntrenats.append(lbl);
           
        });
    });
    
    const socol = io.connect('https://localhost:4000');
    document.getElementById('asso').addEventListener('click',ferAssociacio,false);
    document.getElementById('desa').addEventListener('click',desarAssociacio,false);
    socol.on('retornLlista2', retornLlista2);
    socol.emit('llista2');

    function ferAssociacio(){
        var mE = document.getElementsByClassName('modelEntrenat'); 
        var m3D = document.getElementsByClassName('model3D'); 
        
        mE = Array.from(mE);
        m3D = Array.from(m3D);
        mE = mE.filter(m => m.checked == true);
        m3D = m3D.filter(m => m.checked == true);

        if(mE[0] && m3D[0]){
            var li = document.createElement('li');
            li.innerHTML = mE[0].value + ' - ' + m3D[0].value;
            document.getElementById('associacio').append(li);
            document.getElementById(mE[0].value).remove();
            document.getElementById(m3D[0].value).remove();
            mE[0].remove();
            m3D[0].remove();
        }

    }

    function desarAssociacio(){
        var associacions = new Array();
        for(let i = 0; i<document.getElementById('associacio').getElementsByTagName('li').length; i++ ){
            associacions.push(document.getElementById('associacio').getElementsByTagName('li')[i].innerHTML);
        }
        localStorage.setItem('associacions', JSON.stringify(associacions));

        alert('Dades desades correctament.');

    }

    function retornLlista2(dades){

        var models3D = document.getElementById('models3D');

        dades = JSON.parse(dades);
        dades.llista.forEach(file => {

            let inpt = document.createElement('input');

            inpt.id = 'model3D';
            inpt.type = 'radio';
            inpt.name = 'model3D';
            inpt.classList.add('model3D');
            inpt.value = file;

            let lbl = document.createElement('label');
            lbl.for = 'model3D';
            lbl.id = file;
            lbl.innerHTML = '&nbsp' + file;

            models3D.append(inpt);

            models3D.append(lbl);

        });
    }
}