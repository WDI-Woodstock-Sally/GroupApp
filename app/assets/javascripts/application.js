// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


$(document).ready(function(){

  $( '.menu-btn' ).click(function(){
    $('.responsive-menu').toggleClass('expand');
  })

})



var app = app || {};
var active = active || {};

function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {

       callback();

       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}
//
// $(document).ready(function(evt){
//
//   // CREATE A REFERENCE TO FIREBASE
//   active.messagesRef = new Firebase('https://triviabase.firebaseio.com/messages');
//   active.questionRef = new Firebase('https://triviabase.firebaseio.com/questions');
//   active.activeQuestionRef = new Firebase('https://triviabase.firebaseio.com/activequestion');
//
//
//   active.newQuestion = function(){
//     var questions = getQuestions(function(data, numChildren){
//       var rand = Math.floor((Math.random() * numChildren) + 1);
//       var counter = 1;
//       console.log(rand);
//       for (var key in data){
//         if(counter == rand){
//           active.activeQuestionRef.remove()
//           active.activeQuestionRef.push(data[key]);
//           console.log(data[key])
//         }
//         counter++
//
//       }
//     });
//   }
//
//   $('#start-trivia').click(function(){
//     var timer = 10;
//     active.newQuestion();
//     setIntervalX(function(){
//       timer --;
//       //console.log(timer);
//       $("#timer").text(timer.toString());
//
//     }, 1000, 10);
//     setIntervalX(function(){
//       timer = 10;
//       setIntervalX(function(){
//         timer --;
//         //console.log(timer);
//         $("#timer").text(timer.toString());
//
//       }, 1000, 10);
//
//       active.newQuestion();
//     }, 10000, 10);
//   })
//
//   $('.question-li').click(function(){
//     $('.answer-selected').removeClass('answer-selected')
//     $(this).addClass('answer-selected');
//   })
//
//   var getQuestions = function(callback){
//     active.questionRef.on("value", function(snapshot) {
//       numChildren = snapshot.numChildren();
//       var data = snapshot.val();
//
//       callback(data, numChildren);
//     }, function (errorObject) {
//       console.log("The read failed: " + errorObject.code);
//     });
//   }
//
//
//   // REGISTER DOM ELEMENTS
//   var messageField = $('#messageInput');
//   var nameField = $('#nameInput');
//   var messageList = $('#example-messages');
//
//   // LISTEN FOR KEYPRESS EVENT
//   messageField.keypress(function (e) {
//     if (e.keyCode == 13) {
//       //FIELD VALUES
//       var username = nameField.val();
//       var message = messageField.val();
//
//       //SAVE DATA TO FIREBASE AND EMPTY FIELD
//       active.messagesRef.push({username:username, message:message});
//       messageField.val('');
//     }
//   });
//
//   active.activeQuestionRef.on('child_added', function(snapshot){
//
//     var data = snapshot.val();
//     var prompt = data.prompt;
//     var right = data.right;
//     var wrongs = data.wrongs;
//
//     var questionElement = $('#question-h2');
//     var answerElements = $('.question-li');
//
//     questionElement.text(prompt)
//     var rand = Math.floor((Math.random() * 4));
//     active.correct = rand;
//     for(var i = 0; i < 4; i++){
//       if(i != rand){  answerElements[i].textContent  = wrongs.pop()   }
//       else { answerElements[i].textContent = right }
//
//     }
//
//
//
//
//   })
//
//   // Add a callback that is triggered for each chat message.
//   active.messagesRef.limitToLast(10).on('child_added', function (snapshot) {
//     //GET DATA
//     var data = snapshot.val();
//     var username = data.username || "anonymous";
//     username +=  ": ";
//     var message = data.message;
//
//     //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
//     var messageElement = $("<li class='chat-message'>");
//     var nameElement = $("<strong class='example-chat-username'>: </strong>")
//     nameElement.text(username);
//     messageElement.text(message).prepend(nameElement);
//
//     //ADD MESSAGE
//     messageList.append(messageElement)
//
//     //SCROLL TO BOTTOM OF MESSAGE LIST
//     messageList[0].scrollTop = messageList[0].scrollHeight;
//   });
//
//
//
//
// })
