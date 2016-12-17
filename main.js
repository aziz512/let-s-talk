var currentQuestion;
var questions = [
    {
        question: 'I want to commit suicide. Should I do it?',
        answered:false,
        options:[
            {title:"don't do it", positive: true},
            {title:'go for it', positive: false}
        ],
        optionChosen: undefined
    },
    {
        question: 'Im being abused at home and it is all my fault, should i just give up?',
        answered:false,
        options:[
            {title:"It's never your fault, you should not be treated that way.", positive: true},
            {title:"Yeah it's totally your fault, hurry up and give in.", positive: false}
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
    currentQuestion = questions.filter(x => !x.answered)[0];
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
        
        //timeout for reaction
        setTimeout(() => {
            nextQuestion();
            updateUI();
        }, 3000);
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
