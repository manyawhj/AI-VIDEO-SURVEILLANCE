vidoe="";
objects=[];
Status="";

function preload(){
video=createVideo("video.mp4");
video.hide();
}

function setup(){
    canvas=createCanvas(350,300);
    canvas.center();
    
}

function draw(){
    image(video,0,0,350,300);

    if (Status!=""){
        objectDetector.detect(video,gotResults);

        for (i=0 ;i<objects.length ; i++){
            document.getElementById("status").innerHTML="Status: Object detected";
            document.getElementById("number").innerHTML="Number of objects detected:" + objects.length;
    
           fill("#ff0000");
           percent=floor(objects[i].confidence*100);
           text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15 );
           noFill();
           stroke("#ff0000");
           rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }

}
}

function gotResults(error,results){
    if (error){
        console.log(error);
}
console.log(results);
objects=results;
}


function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoade);
    document.getElementById("status").innerHTML="Status: detecting objects";
}

function modelLoade(){
    console.log("model is loaded");
    Status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}