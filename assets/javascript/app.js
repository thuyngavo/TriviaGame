$(document).ready(function() {
    //track pages and time
    var questionCounter = 0;
    var ansTimeout = 2000;
    
    //variables to track score
    var correct = 0;
    var incorrect = 0;
    var missed = 0;
    var userAns = [];
    
    //questions and answers
    var questions = [
    {
        question: "What is Sailor Moon's name?",
        choices: ["Rei Hino", "Ami Mizuno", "Kino Makto",  "Usagi Tsuino", "Setsuna Meioh"],
        choicesAnswer: 3
    },
    {
        question: "What item appeared when the Three Talismans came togehter?",
        choices: ["Spiral Heart Moon Rod", "Eternal Tiara", "Holy Grail", "Heart Crystal", "Star Power Stick"],
        choicesAnswer: 2
    },
    {
        question: "Sailor Moon is the first of five seasons in the Original Sailor Moon Anime Series. In what year was this series premiered?",
        choices: ["1992", "1986", "1993", "2000", "1995"],
        choicesAnswer: 0
    },
    {
        question: "Other than Sailor Moon, Which sailor scout had a manga featuring her as the main herion?",
        choices: ["Sailor Mars", "Sailor Mercury", "Sailor Uranus", "Sailor Venus", "Sailor Saturn"],
        choicesAnswer: 3
    },
    {
        question: "What is NOT one of the three talismans?",
        choices: ["Spiral Heart Moon Rod", "Deep Aqua Mirror", "Space Sword", "Garnet Orb"],
        choicesAnswer:0 
    },
    {
        question: "Who gave Luna-P to Chibiusa Tsukino?",
        choices: ["Sailor Saturn", "Sailor Pluto", "Tuxedo Mask", "Helios", "Sailor"],
        choicesAnswer: 1
    },
    {
        question: "Who was the 'Soldier of Ruin and Birth' and had the power to destroy the planet?",
        choices: ["Sailor Uranus", "Sailor Moon", "Sailor Saturn", "Sailor Pluto", "Sailor Saturn"],
        choicesAnswer: 4
    },
    {
        question: "What was Pegasus' true identity?",
        choices: ["Kunzite", "Helios", "Mamoru", "Shingo", "Artemis"],
        choicesAnswer: 1
    }];
    
    //submit answers
    function submitAns() {
        $("#submit").on("click", function(event) {
            event.preventDefault();
            userAns.length = 0;
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
            userAns.push(userSelection);
            console.log(userAns);
            nextQ();
        });
    };
        
    //make timer count down
    var timeLeft = 5;
    var increment;
    function runTimer() {
        increment = setInterval(decrement, 1000);
    };
    
    function decrement() {
        timeLeft--;
        $("#time-left").html("Time remaining: " + timeLeft + " seconds");
        if (timeLeft === 0) {
            stopTimer();
            userAns.length = 0;		
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
            userAns.push(userSelection);
            console.log(userAns);
            nextQ();
        };
    };
    
    function resetTimer() {
        timeLeft = 5;
        $("#time-left").html("Time remaining: " + timeLeft + " seconds");
    };
    
    //hide timer
    function displayTimer() {
        $("#time-left").html("");
    };
    
    function stopTimer() {
        clearInterval(increment);
    };
    
    //show response options
    function createRadios() {
        var responseOptions = $("#responses");
        responseOptions.empty();
            
        for (var i = 0; i < questions[questionCounter].choices.length; i++) {
            responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><div class="twd-opt">' + questions[questionCounter].choices[i] + '</div></input><br></label>');
        };
    };
    
    //new question
    function displayQ() {
        clearQ();
        resetTimer();
        $(".questionX").html(questions[questionCounter].question);
        createRadios();
        $("#submit-div").append('<button type="submit" class="btn btn-default" id="submit">' + "Submit" + '</button>');
        runTimer()
        submitAns();
    };
    
    //Starting page for game
    function displayStart() {
        $("#content").append('<a href="#" class="btn btn-primary btn-lg" id="start-button">' + "Start" + '</a>');
        $("#start-button").on("click", function(event) {
            event.preventDefault();
            firstQ();
            
        });
    };
    
    //reset
    function reset() {
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        missed = 0;
        userAns = [];
    };
    
    //results page at end of game
    function displayEnd() {
        clearQ();
        $("#content").append('<h3>' + "Correct answers: " + correct + '</h3><br><h3>' + "Incorrect answers: " + incorrect + '</h3><br><h3>' + "Skipped questions: " + missed + '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart Game" + '</a>');
        $("#restart-button").on("click", function(event) {
            event.preventDefault();
            reset();
            clearQ();
            displayStart();
        });
    };
    
    //clear question each time
    function clearQ() {
        var questionDiv = $(".questionX");
        questionDiv.empty();
        var responsesDiv = $("#responses");
        responsesDiv.empty();
        var submitDiv = $("#submit-div");
        submitDiv.empty();
        var contentDiv = $("#content");
        contentDiv.empty();
        stopTimer();
    };
    
    //showresults
    function checkQ() {
        clearQ();
        var correctAnswer = questions[questionCounter].choicesAnswer;
        if (userAns[0] == questions[questionCounter].choicesAnswer) {
            $("#content").append('<h5>'+"Congratulations! You chose the right answer!" + '</h5>' + '<br><br>' + '<img id="img" src="assets/images/happy.jpg" />');
            correct++;
            displayTimer();
        }else if (userAns[0] === undefined) {
            $("#content").append('<h5>'+"Time's up!" + '</h5><br><br>' + '<img id="img" src="assets/images/time-up.jpg" />' +'<br><br><h5>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h5>');
            missed++;
            displayTimer();
        }else {
            $("#content").append('<h5>'+"You chose the wrong answer." + '</h5><br><br>' + '<img id="img" src="assets/images/sad.jpg" />' +'<br><br><h6>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h5>');
            incorrect++;
            displayTimer();
        };
    };
    
    //change the question 
    function nextQ() {
        checkQ();
        questionCounter++;
        if (questionCounter === questions.length) {
            setTimeout(displayEnd, ansTimeout);
        } 
        else {
            setTimeout(displayQ, ansTimeout);
        };
    };
    
    //first question
    function firstQ() {
        var startContent = $("#content");
        startContent.empty(); 
        displayQ();
    };
    
    //start page
    displayStart();
    
    });