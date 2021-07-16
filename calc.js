'use strict'; 

var expressionArray = [];
var lastSymbol = '';
var strExpr = '';

function calculate(exprArr) {
    lastSymbol = exprArr.pop();
    let firstNum = parseFloat(exprArr[0]);
    let symbol = exprArr[1];
    let secondNum = parseFloat(exprArr[2]);
    let result = null;
    
    switch (symbol) {
        case '+':
            result = firstNum + secondNum;
            break;
        
        case '/':
            result = firstNum / secondNum;
            break;
    
        default:
            break;
    }
    //preparing for continuous calculation
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
    let tmpStr = '';
    $('span div').on('click', function() {
        
        let val = $(this).html();
        strExpr += val;
        if((val != '+') && 
            (val != '=') &&
            (val != '/')
            ) {
            tmpStr += val;
            console.log(expressionArray);
        } 
        else {
            // continuous calculation (calculating by adding next math operation symbol to previous result)
            if (!tmpStr && expressionArray[0]) {
                expressionArray.push(val);
                strExpr = expressionArray[0] + val;
            }
            
            else {
                // no continous calculation = overriding old result
                if (expressionArray[0] && (!expressionArray[1])) {
                    expressionArray[0] = tmpStr;
                }
                // continuous calculation (result with math operation symbol, adding second number term)
                else {
                    expressionArray.push(tmpStr);
                }
                expressionArray.push(val);
            }
            tmpStr = '';
            console.log(expressionArray);
        }
        
        console.log(val);
        $('#result').html(strExpr);

        if(expressionArray.length == 4) {
            let regex = /^[\-]?\d+(\.\d+)?[\+\-\*\/]{1}[\+\-]?\d+(\.\d+)?[\+\-\*\/\=]{1}$/;
            let divideZero = /^[\-]?\d+(\.\d+)?\/{1}[\+\-]?0\=$/;
            if (!regex.test(expressionArray.join(''))){
                console.log('no valid expression');
                expressionArray = [];
                strExpr = '';
                // $('#result').html(strExpr);
            }
            else if (divideZero.test(expressionArray.join(''))) {
                console.log('errrrr');
                expressionArray = [];
                strExpr = '';
                // $('#result').html(strExpr);
            }
            else {
                let result = calculate(expressionArray);
                $('#result').html(result);
                strExpr = '';
                console.log(result);
            }
            
            //console.log(result);
        }
        if(expressionArray.length > 4) {
            console.log('too long');
            expressionArray = [];
            strExpr = '';
            $('#result').html(strExpr);
        }

    })
})