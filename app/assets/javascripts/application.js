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

var app = app || {};
var active = active || {};


$(document).ready(function(evt){

  // CREATE A REFERENCE TO FIREBASE
  active.messagesRef = new Firebase('https://triviabase.firebaseio.com/messages');
  active.questionRef = new Firebase('https://triviabase.firebaseio.com/questions')
  active.activeQuestionRef = new Firebase('https://triviabase.firebaseio.com/activequestion')

  $('#new-question').click(function(){
    var questions = getQuestions(function(data, numChildren){
      var rand = Math.floor((Math.random() * numChildren) + 1);
      var counter = 1;
      console.log(rand);
      for (var key in data){
        if(counter == rand){
          active.activeQuestionRef.remove()
          active.activeQuestionRef.push(data[key]);
          console.log(data[key])
        }
        counter++

      }
    });

    //var question = Math.floor(Math.random(questions))
    //console.log(questions)
  })

  var getQuestions = function(callback){
    active.questionRef.on("value", function(snapshot) {
      numChildren = snapshot.numChildren();
      var data = snapshot.val();
      //console.log(data);

      callback(data, numChildren);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }


  // REGISTER DOM ELEMENTS
  var messageField = $('#messageInput');
  var nameField = $('#nameInput');
  var messageList = $('#example-messages');

  // LISTEN FOR KEYPRESS EVENT
  messageField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      var username = nameField.val();
      var message = messageField.val();

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      active.messagesRef.push({username:username, message:message});
      messageField.val('');
    }
  });

  active.activeQuestionRef.on('child_added', function(snapshot){
    var data = snapshot.val();
    var prompt = data.prompt;
    var right = data.right;
    var wrongs = data.wrong;

  })

  // Add a callback that is triggered for each chat message.
  active.messagesRef.limitToLast(10).on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var username = data.username || "anonymous";
    username +=  ": ";
    var message = data.message;

    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var messageElement = $("<li class='chat-message'>");
    var nameElement = $("<strong class='example-chat-username'>: </strong>")
    nameElement.text(username);
    messageElement.text(message).prepend(nameElement);

    //ADD MESSAGE
    messageList.append(messageElement)

    //SCROLL TO BOTTOM OF MESSAGE LIST
    messageList[0].scrollTop = messageList[0].scrollHeight;
  });

})
