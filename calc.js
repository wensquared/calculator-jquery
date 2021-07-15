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
        } 
        else {
            expressionArray.push(tmpStr);
            expressionArray.push(val);
            tmpStr = '';
        }
        
        console.log(val);
        $('#result').html(tmpStr);
        console.log(expressionArray);

        if(expressionArray.length == 4) {
            let result = calculate(expressionArray);
            console.log(result);
        }

    })
})