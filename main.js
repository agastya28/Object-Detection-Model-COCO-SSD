
img = ""
status = ""
objects = []

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {

    canvas = createCanvas(640, 420);
    canvas.center()

    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Staus: Detecting Objects"
}

function draw() {
    image(img, 0, 0, 640, 420);
/*
    fill("#ba170b")
    text("Dog", 90, 80)
    noFill()
    stroke('#ba170b')
    rect(75, 60, 500, 355)

    fill("#ba170b")
    text("Cat", 310, 100)
    noFill()
    stroke('#ba170b')
    rect(300, 75, 295, 315) */
    if (status !="") {

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected"
            fill("#ba170b")
            percent = floor(objects[i].confidence*100);
            console.log(percent);
            text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 20)
            noFill()
            stroke("#ba170b")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function modelLoaded() {
    console.log("Model Loaded")
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results);
        objects = results;
    }
}