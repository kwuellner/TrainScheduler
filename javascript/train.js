
// firebase config/initialize
var config = {
    apiKey: "AIzaSyCrLAgvgsTOfPgq4eiotuSZxRIehEkOu5Y",
    authDomain: "trainscheduler-540ec.firebaseio.com/",
    databaseURL: "https://trainscheduler-540ec.firebaseio.com/",
    storageBucket: "gs://trainscheduler-540ec.appspot.com"
};

firebase.initializeApp(config);

// creating reference for database 
var database = firebase.database();

// adding current time
$("#current-time").append(moment().format("h:mm:ss a"))

var trainName = "";
var destination = "";
var fristTrain = "";
var frequency = "";
var arrival = "";
var minAway = "";
var removeTrain = "";

// button to add
$("#add-train").on("click", function (event) {
    event.preventDefault();

    // var for user inputs
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    fristTrain = moment($("#first-train").val().trim(), "HH:mm").subtract(1, "years");
    frequency = $("#frequency").val().trim();
    arrival = $("#next-arrival").val().trim();
    minAway = $("#min-away").val().trim();
    removeTrain = $("#remove").val().trim();

    // changes to firebase data
    database.ref().set({
        trainName: trainName,
        destination: destination,
        fristTrain: fristTrain,
        frequency: frequency,
        arrival: arrival,
        minAway: minAway,
        removeTrain: removeTrain,
    });

});

// printing changes to data
database.ref().on("value", function (snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().fristTrain);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().arrival);
    console.log(snapshot.val().minAway);


})





