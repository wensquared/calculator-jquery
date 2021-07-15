'use strict'; 

var expressionArray = [];
var tmpStr = '';
var lastSymbol = '';

function calculate(exprArr) {
    lastSymbol = exprArr.pop();
    let firstNum = parseFloat(exprArr[0]);
    let symbol = exprArr[1];
    let secondNum = parseFloat(exprArr[2]);
    let result = 0;
    
    switch (symbol) {
        case '+':
            result = firstNum + secondNum;
            break;
    
        default:
            break;
    }

    if (lastSymbol == '=') {
        expressionArray = [];
        expressionArray.push(result);
    }
    else {
        expressionArray = [];
        expressionArray.push(result);
        expressionArray.push(lastSymbol);
    }

    return result;
}


$( document ).ready(function() {
    console.log('Page loaded');

    $('span div').on('click', function() {
        // console.log('Clicked number');
        // event.preventDefault(); 
        // $(this).css('backgroundColor','green');
        let val = $(this).html();

        if((val != '+') && (val != '=')) {
            tmpStr += val;
            console.log(expressionArray);
        } 
        else {
            if (!tmpStr) {
                expressionArray.push(val);
            }
            else {
                expressionArray.push(tmpStr);
                expressionArray.push(val);
            }
            tmpStr = '';
            console.log(expressionArray);
        }
        
        console.log(val);
        $('#result').html(expressionArray.join(''));

        if(expressionArray.length == 4) {
            let result = calculate(expressionArray);
            console.log(result);
        }

    })
})