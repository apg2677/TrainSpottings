

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBCREs1yNjAQ8CGj-PZVTL-e1F7g-rsRDY",
    authDomain: "trainspottings-c747b.firebaseapp.com",
    databaseURL: "https://trainspottings-c747b.firebaseio.com",
    projectId: "trainspottings-c747b",
    storageBucket: "",
    messagingSenderId: "191751232305"
};
firebase.initializeApp(config);
var database = firebase.database();

$(document).ready(function () {
    $("#btnSubmit").click(HandleSubmit);

    OnDBChange();
});

var trainCollection = [];


function OnDBChange() {
    database.ref().on("value", function (snapshot) {
        console.log(snapshot.val());
        // clickCounter = snapshot.val().clickCount;
       
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function HandleSubmit(event) {
    event.preventDefault();


    var trainName = $("#TrainName").val().trim();
    var destination = $("#Destination").val().trim();
    var frequency = $("#Frequency").val().trim();
    var nextArrival = $("#NextArrival").val().trim();
    var minutesAway = $("#MinutesAway").val().trim();

    var tempTrain = {
        name: trainName,
        dest: destination,
        freq: frequency,
        next: nextArrival,
        minsAway: minutesAway
    };
    trainCollection.push(tempTrain);
    Display(tempTrain);

    database.ref().set({
        name: tempTrain.name,
        dest: tempTrain.dest,
        freq: tempTrain.freq,
        next: tempTrain.next,
        minsAway:tempTrain.minsAway
    });

    function Display(train) {
        console.log("Train: " + train.name);
        console.log("Destination:" + train.dest);
        console.log("Frequency: " + train.freq);
        console.log("Next Arrival: " + train.next);
        console.log("Minutes Away: " + train.minsAway);
        console.log(trainCollection);

        var trainTable = $("#trainTable");
        var newRow = $("<tr>");
        var newCol1 = $("<td>");
        newCol1.text(train.name);
        var newCol2 = $("<td>");
        newCol2.text(train.dest);
        var newCol3 = $("<td>");
        newCol3.text(train.freq);
        var newCol4 = $("<td>");
        newCol4.text(train.next);
        var newCol5 = $("<td>");
        newCol5.text(train.minsAway);
        newRow.append(newCol1).append(newCol2).append(newCol3).append(newCol4).append(newCol5);
        trainTable.append(newRow);

    }
}





