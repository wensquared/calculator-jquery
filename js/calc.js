'use strict'; 

var expressionArray = [];
var strExpr = '';

class Calculator {

    addition(valArray) {
        $('#result').html(parseFloat(valArray[0]) + parseFloat(valArray[2]));
    }

    substraction(valArray) {
        $('#result').html(parseFloat(valArray[0]) - parseFloat(valArray[2]));
    }

    multiplication(valArray) {
        $('#result').html(parseFloat(valArray[0]) * parseFloat(valArray[2]));
    }

    division(valArray) {
        $('#result').html(parseFloat(valArray[0]) / parseFloat(valArray[2]));
    }

    percentage(valArray) {
        $('#result').html(parseFloat(valArray[2]) / 100 * parseFloat(valArray[0]));
    }

    exponent(valArray) {
        $('#result').html(Math.pow(parseFloat(valArray[0]),parseFloat(valArray[2])));
    }

    delete() {
        expressionArray = [];
        strExpr = '';
        $('#result').html('0');
        $('#math_expr').html('');
        console.log('Delete');
    }
}

$(document).ready(function() {

    var calc = new Calculator;
    let tmpStr = '';

    $('#dlg1').dialog({
        dialogClass: "no-close",
        autoOpen: false,
        width:400,
        height: 250,
        modal:true,
        buttons: [
            {
            text: "Ok",
            click: function() {
                $( this ).dialog( "close" );
                }
            }
        ]
    });

    $('span div').on('click', function() {

        let val = $(this).html();
        
        // number clicked
        if($(this).data('value') && ($(this).attr('data-operation') != 'delete')) {

            // deletion of last calculation(if there is any), with no intend to continue(= starting complete new calculation)
            if(($('#math_expr').html() != '') && expressionArray.length == 1){
                expressionArray = [];
                tmpStr += val;
                strExpr = $(this).html();
                $('#result').html(strExpr);
                $('#math_expr').html('');
            }
            else {
                tmpStr += val;
                strExpr += $(this).html();
                $('#result').html(strExpr);
            }
            console.log('tmpStr: ' + tmpStr);
        }
        
        // operator clicked
        if($(this).data('operation') !== undefined) {

            if(tmpStr) {
                expressionArray.push(tmpStr);
            }

            // clicked +/-
            if($(this).data('operation') == 'addSub') {

                if(expressionArray.length == 1) {
                    let number = parseFloat(expressionArray[0]);
                    number = number - (number * 2);
                    expressionArray[0] = number.toString();
                    strExpr = expressionArray[0];
                }
                if(expressionArray.length == 3) {
                    let number = parseFloat(expressionArray[2]);
                    number = number - (number * 2);
                    expressionArray[2] = number.toString();
                    
                    // rewrite 2nd half of math expression on screen
                    strExpr = strExpr.slice(0,-tmpStr.length);
                    strExpr += expressionArray[2];
                }

                $('#result').html(strExpr);

            }
            else {
                expressionArray.push($(this).data('operation'));
                strExpr += $(this).html();
                $('#result').html(strExpr);
            }

            tmpStr = '';
        
            if(expressionArray.length == 4) {
                
                let regex = /^[\-]?\d+(\.\d+)?[\+\-\*\/\% of ]{1}| b\<sup\>n\<\/sup\> [\+\-]?\d+(\.\d+)?[\+\-\*\/\=]{1}$/;
                let divideZero = /^[\-]?\d+(\.\d+)?\/{1}[\+\-]?0\=$/;

                if(!regex.test(strExpr)) {
                    $('#dlg1').html('Invalid math expression');
                    $('#dlg1').dialog('open');
                    calc.delete();
                    
                }
                else if(divideZero.test(strExpr)) {
                    let randomText = [
                        'Invalid math expression',
                        'To infinity and beyond...',
                        'Please don\'t divide through zero',
                        'No'
                    ];
                    $('#dlg1').html(randomText[Math.floor(Math.random() * randomText.length)]);
                    $('#dlg1').dialog('open');
                    calc.delete();
                }
                else {

                    calc[expressionArray[1]](expressionArray);
                    $('#math_expr').html(strExpr);

                    // preparing for continuous calculation
                    if(expressionArray[3] == 'endResult') {
                        expressionArray = [];
                        expressionArray[0] = $('#result').html();
                        strExpr = $('#result').html();
                    }
                    else {
                        let tmpExpr = expressionArray[3];
                        expressionArray = [];
                        expressionArray[0] = $('#result').html();
                        expressionArray[1] = tmpExpr;
                        strExpr = $('#result').html();
                        strExpr += $('span div[data-operation="'+ tmpExpr +'"]').html()
                    } 
                }
            }

            if(expressionArray.length > 4) {
                $('#dlg1').html('Invalid math expression');
                $('#dlg1').dialog('open');
                calc.delete();
            }
        }
        
        if($(this).attr('data-operation') == 'delete') {
            calc.delete();
        }
    });
});