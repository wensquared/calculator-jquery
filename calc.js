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
        case '-':
            result = firstNum - secondNum;
            break;
        case '*':
            result = firstNum * secondNum;
            break;
        case '/':
            result = firstNum / secondNum;
            break;
        case '%':
            result = (secondNum / 100 * firstNum);
            break;
        case 'b<sup>n</sup>':
            result = Math.pow(firstNum,secondNum);
            break;
    
        default:
            break;
    }

    $('#math_expr').html(expressionArray.join('')+lastSymbol);

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
    // console.log('Page loaded');
    let tmpStr = '';
    $('span div').on('click', function() {
        let val = $(this).html();
        
        if( val != '+/-') {
            strExpr += val;
        }

        if( val == '+/-') {
            let toNum = parseFloat(tmpStr);
            if (toNum < 0) {
                toNum = Math.abs(toNum);
                tmpStr = '+' + tmpStr;
                
                
            }
            else {
                toNum = Math.abs(toNum) * -1;
                tmpStr = '-' + tmpStr;
            }
            tmpStr = toNum.toString();
            expressionArray.push(tmpStr);
            tmpStr = '';
            $('#result').html(expressionArray.join(''));
            
        }
        else if( (val != '+') && 
            (val != '-') &&
            (val != '*') &&
            (val != '/') &&
            (val != 'C') &&
            (val != '%') &&
            (val != 'b<sup>n</sup>') &&
            (val != '=')) {
                tmpStr += val;
               
                $('#result').html(strExpr);
        }
        
        else if( val == 'C') {
            tmpStr = '';
            expressionArray = [];
            strExpr = '';
            $('#math_expr').html('');
            $('#result').html('');
            
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
                // continuous calculation (result with math operation symbol, adding second number-term)
                else {
                    expressionArray.push(tmpStr);
                }
                expressionArray.push(val);
            }
            tmpStr = '';
            $('#result').html(strExpr);
        }

        //check for valid math expression
        if(expressionArray.length == 4) {
            let regex = /^[\-]?\d+(\.\d+)?[\+\-\*\/\%]{1}|b\<sup\>n\<\/sup\>[\+\-]?\d+(\.\d+)?[\+\-\*\/\=]{1}$/;
            let divideZero = /^[\-]?\d+(\.\d+)?\/{1}[\+\-]?0\=$/;
            
            if(!regex.test(expressionArray.join(''))){
                console.log('no valid math expression');
                
                $('#math_expr').html(expressionArray.join(''));
                $('#result').html('no valid math expression');
                expressionArray = [];
                strExpr = '';
            }
            else if(divideZero.test(expressionArray.join(''))) {
                $('#math_expr').html(expressionArray.join(''));
                $('#result').html('To Infinity and beyond......');
                expressionArray = [];
                strExpr = '';

            }
            else {
                let result = calculate(expressionArray);
                $('#result').html(result);
                strExpr = '';
            }
            
        }
        if(expressionArray.length > 4) {
            $('#result').html('no valid math expression');
            expressionArray = [];
            strExpr = '';
            $('#result').html(strExpr);
        }
    })
})