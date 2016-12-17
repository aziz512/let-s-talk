var currentQuestion;
var responses = [
    "I see... What you're saying makes sense, I guess. I think I'll follow your advice, then.",
    "What...? I'm not sure what I expected, but I don't think that's it..."
];
var questions = [
    {
        question: 'My really, really close friend wants me to do something that I\'m not sure about... Everyone said that it\'s not a good thing, but I\'m not sure. What should I do?',
        answered:false,
        options:[
            {title:"Even if you trust them, friends can be wrong too. Don't do something unsafe.", positive: true},
            {title:"If you're unsure, then talk to them about it. What they want might not be what you want, so ask!", positive: true},
            {title:'Just do what they want you to do, it\'s not that big of a deal. Your friends always know best.', positive: false}
        ],
        optionChosen: undefined
    },
    {
        question: 'My older brother keeps hitting me and stealing and breaking my stuff, and my mom won\'t believe me. I really hate it and it hurts, but he tells me it\'s my fault, and I\'m starting to think it is, too... What should I do?',
        answered:false,
        options:[
            {title:"It's not your fault, no one should be treated that way. I think you should sit down and talk to your mom, or get professional help like www.thehotline.org.", positive: true},
            {title:"Ugh, your mom is stupid and your brother is awful! You shouldn't let them step on you like this, just tell them to stop.", positive: false},
            {title:"It's no big deal, everyone's siblings are like that. My mom never listens to me either, so don't worry about it.", positive: false}
            ],
        optionChosen: undefined
    },
    {
        question: 'I know I deserve it because I\'m useless and mess up everything I try to do, but lately my girlfriend gets angry at me all the time, especially when she wants us to sleep together, but I really don\'t want to... Should I just do what she wants?',
        answered:false,
        options:[
            {title:"Don't be so inconsiderate, especially if you're such a horrible person. You should just do what she wants! Besides, you're getting laid.", positive: false},
            {title:"Just talk to her, dude! It sounds like you have some problems of her own, and she's dealing it the best she can. Girls can't be abusive, man.", positive: false},
            {title:"You aren't useless, no one is. It sounds like she's being irrational and takes out her anger on you even though she shouldn't. I think you should call someone, maybe a hotline like https://www.1800respect.org.au/, if you can't get away from them safely.", positive: true}
            ],
        optionChosen: undefined
    },
    {
        question: 'Everyone I know hates me, and I just KNOW that they want me to die... They keep sending me invitations to things, but I know that they\'re just sending it because they have to. No one actually cares about me, because if they did, they would come to my house and actually bring me to the parties they\'re all at without me!',
        answered:false,
        options:[
            {title:"I think you might be reading too much into it... It sounds like they're either just being polite because they don't know you well, or they really do want you to go. I think you're being too self-conscious and overthinking things, not everyone hates someone for no reason. If you haven't done anything to wrong them, I'm sure they really do want to spend time with you! :D", positive: true},
            {title:"Not literally everyone hates you, man. Why not meet new people that don't know you yet, and so don't hate you, either? If that doesn't work out, maybe talk to someone... If you can't trust people offline, then you could try https://www.7cups.com/ and talk to people anonymously online.", positive: true},
            {title:"Dude, get over yourself. The reason why you think everyone hates you is because you think everyone should jump off a cliff or something to prove that they aren't horrible people, and that's really unfair of you. Don't be so selfish, you heinous jerk.", positive: false}
            ],
        optionChosen: undefined
    }
];




function nextQuestion(){
    questions.forEach((value, index) => {
        if (value.question === currentQuestion.question) {
            questions[index].answered = true;
        }
    });
    if (questions.filter(x => !x.answered).length != 0) {
        currentQuestion = questions.filter(x => !x.answered)[0];
    }
    else{
        $('#characters').hide();
        $('.speech-bubble').hide();
        $('#nextButton').hide();
        $('#response-message').text('You finished the game!');
        $('#response').show();
    }
}
function choiceMade(choice){
    questions.forEach((value, index) => {
        if (value.question === currentQuestion.question) {
            value.options.forEach(function(option, optionIndex){
                if(option.title === choice){
                    questions[index].optionChosen = optionIndex;
                }
            });
        }
    });
}

function updateUI(){
    $('#question').html(currentQuestion.question);
    var option = $('<div/>').addClass('choiceBox');
    var optionsNode = $('#options').empty();
    currentQuestion.options.forEach(function(val, index){
        optionsNode.append(option.clone().addClass('choiceBox' + (index+1)).text(val.title));
    });
    
    $('.choiceBox').click(function(event){
        console.log(event.target);
        choiceMade($(event.target).text());
        if(currentQuestion.options.filter(x => x.title === $(event.target).text())[0].positive){
            $('#response-message').text(responses[0]); 
        }
        else{
            $('#response-message').text(responses[1]);
        }
        
        $('#response').show();
        setTimeout(() => {
            $('#response').hide();
            nextQuestion();
            updateUI();
        }, 1500);
    });
    $('#nextButton').click(() => {
        
        nextQuestion();
        updateUI();
    });
}

function init(){
    currentQuestion = questions.filter(x => !x.answered)[0];
    updateUI();
}


init();
