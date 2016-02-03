// JS du quiz Q.C.M. //


(function() {
  var questions = [{
    question: "Quel est le prénom du personnage joué par Bourvil dans la Grand Vadrouille?",
    choices: ["Célestin", "Ferdinand", "Augustin", "Clément", "Firmin"],
    correctAnswer: 2
  }, {
    question: "Quel est le numéro du département des Hauts de Seine?",
    choices: [77, 93, 75, 78, 92],
    correctAnswer: 4
  }, {
    question: "Quel animal est le bidet?",
    choices: ["un petit cheval", "un âne", "un suricate", "un élan", "un gnou" ],
    correctAnswer: 0
  }, {
    question: "En quelle année a été créé le Paris Dakar?",
    choices: [1973, 1975, 1976, 1978, 1980],
    correctAnswer: 3
  }, {
    question: "Quel animal a les yeux bleus l'hiver et marron doré l'été?",
    choices: ["l'hippopotame", "le rhinocéros", "l'éléphant", "la gazelle", "le renne"],
    correctAnswer: 4
  }];
  
  var questionCounter = 0; 
  var selections = []; 
  var quiz = $('#quiz'); 
  
  
  displayNext();
  
  
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  
  
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
 
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
 
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Vous avez ' + numCorrect + ' bonnes réponses sur  ' +
                 questions.length + ' questions!!!');
    return score;
  }
})();