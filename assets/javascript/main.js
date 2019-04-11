

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

    InitTable();
    // OnDBChange();
});

var trainCollection = [];

var trainTable;
// function OnDBChange() {
//     database.ref().on("child_added", function (childSnapshot) {
//         var tempSchedule = childSnapshot.val();
//         console.log(childSnapshot.val());
//         // database.ref().push({
//         //     name: tempTrain.name,
//         //     dest: tempTrain.dest,
//         //     first: tempTrain.first,
//         //     freq: tempTrain.freq,
//         //     next: tempTrain.next,
//         //     minsAway: tempTrain.minsAway
//         // });

//     }, function (errorObject) {
//         console.log("The read failed: " + errorObject.code);
//     });
// }

function HandleSubmit(event) {
    event.preventDefault();

    var trainName = $("#TrainName").val().trim();
    var destination = $("#Destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = parseInt($("#Frequency").val().trim());

    var tempTime = moment(firstTrain, "HH:mm");
    console.log("Temp train: " + tempTime.format("h:mm"));
    var nextArrival = tempTime.add(frequency, 'm');
    console.log("Next Arrival: " + nextArrival.format("h:mm"));

    // CREATE A TABLE OF TIMES FOR EACH TRAIN  
    var tableArray = [];

    tableArray = GetTimeTable(tempTime, frequency);
    console.log("Time Table: " + tableArray);

    var minutesAway = 5;
    var tempTrain = {
        name: trainName,
        dest: destination,
        first: tempTime.format("h:mm"),
        freq: frequency,
        timeTable: tableArray,
        next: nextArrival.format("h:mm"),
        minsAway: minutesAway
    };
    trainCollection.push(tempTrain);
    // Display(tempTrain);

    database.ref().push({
        name: tempTrain.name,
        dest: tempTrain.dest,
        first: tempTrain.first,
        freq: tempTrain.freq,
        times: tempTrain.timeTable,
        next: tempTrain.next,
        minsAway: tempTrain.minsAway
    });

    function Display(train) {
        console.log("Train: " + train.name);
        console.log("Destination:" + train.dest);
        console.log("Frequency: " + train.freq);
        console.log("Next Arrival: " + train.next);
        console.log("Minutes Away: " + train.minsAway);
        console.log(trainCollection);

        AddTableRow(train);

    }

}
function AddTableRow(train) {
    trainTable = $("#trainTable");
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

// function TimeConverter(time) {
//     timeArray = time.split(':');
//     var hours = Number(timeArray[0]);
//     var mins = Number(timeArray[1]);

//     var timeValue;

//     if (hours > 0 && hours <= 12) {
//         timeValue = "" + hours;
//     }
//     else if (hours > 12) {
//         timeValue = "" + (hours - 12);
//     }
//     else if (hours == 0) {
//         timeValue = "12";
//     }

//     timeValue += (mins < 10) ? ":0" + mins : ":" + mins;
//     timeValue += (hours >= 12) ? " P.M." : " A.M.";

//     return timeValue;
// }

// function AddMins(time, freq) {
//     temptime = time.split(':');
//     var hours = temptime[0];
//     var mins = temptime[1];
//     newMins = parseInt(mins) + parseInt(freq);
//     newTime = hours + ":" + newMins;
//     return newTime;

// }

function InitTable() {

    database.ref().on("value", function (snapshot) {
        console.log("Init: " + snapshot.val());
       
        snapshot.forEach(function(data) {
            var val = data.val();
            console.log("name:  "+ val.name);
            AddTableRow(val);
        })
    }); 

}

function GetTimeTable(first, freq) {
    var tempArr = [first.format("HH:mm")];
    console.log("First Entry: " + tempArr[0]);
    var i=0;
    while (i<5){
        tempArr.push(first.add(freq, 'm').format("HH:mm"));
        i++;
        console.log("Start time: " + tempArr[0]);
        console.log("New time: " + tempArr[i-1])
    }
        
    
    return tempArr;
};




