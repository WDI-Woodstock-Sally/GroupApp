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

//function checkAnswer()

function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {

       callback();

       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}


$(document).ready(function(evt){

  $( '.menu-btn' ).click(function(){
    $('.responsive-menu').toggleClass('expand');
  })

  // REGISTER DOM ELEMENTS
  var messageField = $('#messageInput');
  var nameField = $('#nameInput');
  var messageList = $('#example-messages');

  app.ActivePlayerModel = Backbone.Firebase.Model.extend({

    defaults: {
      username: nameField.val(),
      score: 10
    }

  });
  app.ActivePlayerCollection = Backbone.Firebase.Collection.extend({
    model: app.ActivePlayerModel,
    url: "https://triviabase.firebaseio.com/activeplayers"
  });

  app.ActivePlayerView = Backbone.View.extend({
    initialize: function(){
      this.listenTo(this.model,'change', this.render);
      this.listenTo(this.model,'delete', this.remove);
    },
    //__Time Left = <%= timeLeft%>
    //__Created = <%= created%>
    template: _.template('<%= username %>:<%= score %>'),
    tagName: 'li',
    className: 'player-score',
    render: function(){

      this.$el.append( this.template( this.model.attributes ) );
      return this;
    }
  });

  app.ActivePlayerListView = Backbone.View.extend({
  initialize: function(options){
    this.modelView = options.modelView;
    this.listenTo(this.collection,'sync', this.render);
  },
  render: function(){
    console.log("render scores")
    var models = this.collection.models;
    this.$el.empty();
    for (var i = 0; i < models.length; i++) {

      var subView = new this.modelView({model: models[i]});
      subView.render();
      this.$el.append( subView.$el );
      subView.delegateEvents();
    }
    return this;
  },

  });

  app.activePlayers = new app.ActivePlayerCollection();
  app.activePlayerScores = new app.ActivePlayerListView({
    modelView: app.ActivePlayerView,
    collection: app.activePlayers,
    el: $("#scoreboard")

  })
  //app.activePlayers.fetch();


  // CREATE A REFERENCE TO  FIREBASE
  active.messagesRef = new Firebase('https://triviabase.firebaseio.com/messages');
  active.questionRef = new Firebase('https://triviabase.firebaseio.com/questions');
  active.activeQuestionRef = new Firebase('https://triviabase.firebaseio.com/activequestion');
  active.activePlayersRef = new Firebase('https://triviabase.firebaseio.com/activeplayers');


  active.newQuestion = function(){
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
  }

  $('#start-trivia').click(function(){
    var numQuestions = parseInt($("#start-questions").val());
    var seconds = parseInt($("#start-time").val());
    var timer = seconds;
    $('.answer-selected').removeClass('answer-selected');
    active.newQuestion();
    setIntervalX(function(){
      timer --;
      //console.log(timer);
      $("#timer").text(timer.toString());

    }, 1000, seconds);
    setIntervalX(function(){
      timer = seconds;
      setIntervalX(function(){
        timer --;
        //console.log(timer);
        $("#timer").text(timer.toString());

      }, 1000, seconds);
      $('.answer-selected').removeClass('answer-selected');
      active.newQuestion();
    }, seconds * 1000, numQuestions);
  })

  // 'answer-right'
  // 'answer-wrong'
  $("#submit-answer").click(function(){
    if(parseInt($(".answer-selected").val()) == active.correct){
      $('.answer-selected').addClass("answer-right");
      $('.answer-selected').removeClass('answer-selected');
      $('#submit-answer').hide();
      //console.log("correct!");

      if(app.activePlayers.where({username: nameField.val()}) != 0)
        {
          user = app.activePlayers.where({username: nameField.val()})
          tempscore = user[0].attributes.score + 10;
          user[0].save({score: tempscore});
        }
        else{
          console.log('user does not exit')
          var tempname = nameField.val();
          app.activePlayers.add({
            username: tempname,
            score: 20

          })
        }

    }
    else{
      $('.answer-selected').addClass("answer-wrong");
      $('.answer-selected').removeClass('answer-selected');
      $('#submit-answer').hide();
      //console.log("wrong!");
    }

  })


  $('.question-li').click(function(){
    $('.answer-selected').removeClass('answer-selected');
    $(this).addClass('answer-selected');
  })

  var getQuestions = function(callback){
    active.questionRef.on("value", function(snapshot) {
      numChildren = snapshot.numChildren();
      var data = snapshot.val();

      callback(data, numChildren);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }




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

    $('#submit-answer').show();
    $('.answer-wrong').removeClass('answer-wrong');
    $('.answer-right').removeClass('answer-right');

    var data = snapshot.val();
    var prompt = data.prompt;
    var right = data.right;
    var wrongs = data.wrongs;

    var questionElement = $('#question-h2');
    var answerElements = $('.question-li');

    questionElement.text(prompt)
    var rand = Math.floor((Math.random() * 4));
    active.correct = rand;
    for(var i = 0; i < 4; i++){
      if(i != rand){  answerElements[i].textContent  = wrongs.pop()   }
      else { answerElements[i].textContent = right }

    }




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

function findUserId(name, callback){
  var selectedID=null;
  ref = new Firebase('https://triviabase.firebaseio.com/activeplayers');
  ref.once("value", function(data) {
    var users = data.val();

    for(id in users){
      if (users[id].username == name){
        selectedID = id;
      }
    }
    callback(selectedID);
  });

}
