var associacions = JSON.parse(localStorage.getItem('associacions'));
var mapAsso = new Map();
var webcam;
var classePrevia = null;

window.onload = function(){   

    var mE;
    var m3D;
    if(!associacions){
        associacions=["Quadrat - cub.glb","Triangle - tetraedre.glb","Circumferència - esfera.glb"];
    }
    associacions.forEach(asso => {
        
        mE = asso.split(' - ')[0];
        m3D = asso.split(' - ')[1];

        mapAsso[mE] = m3D;

    }); 

    webcam = new tmImage.Webcam(200, 200, true);
    window.requestAnimationFrame(loop);

}

async function loop() {
    webcam.update();
    await detectaModel();
    window.requestAnimationFrame(loop);
}

function dibuixa(mE){

    let video = document.getElementsByTagName('video');
    let divEscena = document.getElementById('escena');

    if(video.length>1){
        video[0].remove();
    }

    if(divEscena.hasChildNodes()){
        divEscena.removeChild(divEscena.firstChild);
    }

    var escena = document.createElement('a-scene');
    escena.setAttribute('arjs','sourceType: webcam; debugUIEnabled: false;');
    escena.setAttribute('vr-mode-ui','enabled: false');

    var model = document.createElement('a-entity');

    model.setAttribute('scale','0.2 0.2 0.2');
    model.setAttribute('rotation','0 45 45');
    model.setAttribute('position','0 2 -5');
    model.setAttribute('material','opacity: 0.3;');
    model.setAttribute('gltf-model','src: url(../models3d/'+ mapAsso[mE] +');');

    var animacio = document.createElement('a-animation');

    animacio.setAttribute('attribute','rotation');
    animacio.setAttribute('dur','20000');
    animacio.setAttribute('to','360 360 360');
    animacio.setAttribute('easing','linear');
    animacio.setAttribute('repeat','indefinite');
    
    model.appendChild(animacio);
    escena.appendChild(model);
    
    divEscena.appendChild(escena);    

}

async function detectaModel(){

    var urlModelEntrenat = localStorage.getItem('urlModelEntrenat');
    var modelEntrenat, numPrediccions, urlModel, urlMetadata;

    if(!urlModelEntrenat){
        urlModelEntrenat = "https://teachablemachine.withgoogle.com/models/i26temL9w/";
    }

    urlModel = urlModelEntrenat + "model.json";
    urlMetadata = urlModelEntrenat + "metadata.json";

    modelEntrenat = await tmImage.load(urlModel, urlMetadata);
    numPrediccions = modelEntrenat.getTotalClasses();

    await webcam.setup();
    await webcam.play();

    const prediction = await modelEntrenat.predict(webcam.canvas);
    let esPredible = false;
    for (let i = 0; i < numPrediccions; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        if (prediction[i].probability > 0.85) {
            if(classePrevia!==prediction[i].className){
                dibuixa(prediction[i].className);
                classePrevia = prediction[i].className;
            }
            esPredible = true;
        }
    }
    if(!esPredible){
        let video = document.getElementsByTagName('video');
        let divEscena = document.getElementById('escena');
    
        if(video.length>1){
            video[0].remove();
        }
    
        if(divEscena.hasChildNodes()){
            divEscena.removeChild(divEscena.firstChild);
        }
        classePrevia = null;
    }
}