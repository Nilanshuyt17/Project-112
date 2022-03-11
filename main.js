var prediction_1 = "";
var prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 100
});

camera = document.getElementById("Webcam1");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src = '" + data_uri + "'>";
    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/bN2OjBt2F/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.SpeechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function prediction() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_name1").innerHTML = results[0].label;
        document.getElementById("result_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (prediction_1 == "Amazing") {
            document.getElementById("result_emoji1").innerHTML = "&#128076;";
        }
        if (prediction_1 == "Best") {
            document.getElementById("result_emoji1").innerHTML = "&#128077;";
        }
        if (prediction_1 == "Victory") {
            document.getElementById("result_emoji1").innerHTML = "&#9996;";
        }
        if (prediction_2 == "Amazing") {
            document.getElementById("result_emoji2").innerHTML = "&#128076;";
        }
        if (prediction_2 == "Best") {
            document.getElementById("result_emoji2").innerHTML = "&#128077;";
        }
        if (prediction_2 == "Victory") {
            document.getElementById("result_emoji2").innerHTML = "&#9996;";
        }
    }
}