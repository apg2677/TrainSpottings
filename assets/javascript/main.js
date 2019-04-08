$(document).ready(function() {
    $("#btnSubmit").click(HandleSubmit);

});



function HandleSubmit(event) {
    event.preventDefault();

    var trainName = $("#TrainName").val().trim();
    var destination = $("#Destination").val().trim();
    var frequency = $("#Frequency").val().trim();
    var nextArrival = $("#NextArrival").val().trim();
    var minutesAway = $("#MinutesAway").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(nextArrival);
    console.log(minutesAway);

}