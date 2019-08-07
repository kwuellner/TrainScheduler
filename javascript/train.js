
// firebase config/initialize
var config = {
    apiKey: "AIzaSyCrLAgvgsTOfPgq4eiotuSZxRIehEkOu5Y",
    authDomain: "trainscheduler-540ec.firebaseio.com",
    databaseURL: "https://trainscheduler-540ec.firebaseio.com",
    projectId: "trainscheduler-540ec",
    storageBucket: "trainscheduler-540ec.appspot.com",
    messagingSenderId: "204735844511",
};

firebase.initializeApp(config);

// creating reference for database 
var database = firebase.database();

// adding current time
$("#current-time").append(moment().format("h:mm:ss a"))

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";
var arrival = "";
var minAway = "";

// button to add
$("#add-train").on("click", function (event) {
    event.preventDefault();

    // var for user inputs
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();
    arrival = $("#arrival").val().trim();
    minAway = $("#min-away").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    console.log(arrival);
    console.log(minAway);

    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var remainder = diffTime % frequency;
    minAway = frequency - remainder;
    arrival = moment().add(minAway, "minutes").format("hh:mm A");



    // changes to firebase data
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        arrival: arrival,
        minAway: minAway,
    });



    // logging data out of snapshot
    database.ref().on("child_added", function (snapshot) {
        console.log(snapshot.val());
        console.log(snapshot.val().trainName);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().firstTrain);
        console.log(snapshot.val().frequency);
        console.log(snapshot.val().arrival);
        console.log(snapshot.val().minAway);


        var newRow = $("<tr>");
        newRow.append($("<td>" + snapshot.val().trainName + "</td>"));
        newRow.append($("<td>" + snapshot.val().destination + "</td>"));
        newRow.append($("<td>" + snapshot.val().frequency + "</td>"));
        newRow.append($("<td>" + snapshot.val().arrival + "</td>"));
        newRow.append($("<td>" + snapshot.val().minAway + "</td>"));


        $("#add-row").append(newRow);


    },
        function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        })




});

