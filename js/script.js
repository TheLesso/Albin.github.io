/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */
let lcd = null; // displayen
let hasComma = false; //Vår variabel för komma-tecknet.
let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /
let hasArithmetic;

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
    }
/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som trycktes ner


    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        // plockar ut siffran från id:et
        let digit = btn.substring(1, 2); 
        if (hasArithmetic) {
            clearLCD();
            hasArithmetic = false;
        }
        addDigit(digit);
    }
    //Våra värden på btn vi använder för att starta calculate().
    if (btn === 'add' || btn === 'sub' || btn === 'mul' || btn === 'div' || btn === 'ht' ||
        btn === 'sin' || btn === 'cos' || btn === 'tan' || btn === 'log' || btn === 'ln') { 
        //Vi tar reda på vad som står i html-koden och använder detta senare i calculate().
        arithmetic = document.getElementById(btn).innerText;
        //Sparar värdet som finns i lcd.value i memory.                
        memory = lcd.value;
        //Rensar lcd:en.                                                 
        clearLCD();
        //Visar valt tecken i lcd
        addDigit(arithmetic)
        //Så tecknet inte kommer med i calculate
        hasArithmetic = true;
        //ifall ett komma finns                                                         
        hasComma = false;                                                   
    }
    //Sätter lcd till calculates värde
    if (btn === 'enter') {                                                  
        lcd.value = calculate();                                          
    }
    //Rensar display
    if (btn === 'clear') {                                                  
        clearLCD();
        memClear();
    }
    //Kör addComma
    if (btn === 'comma') {                                                  
        addComma();
    }
     //Ifall att Henrik gör något konstigt.....
    else {                                                                  

    }
}
//Lägger till värde digit i lcd
function addDigit(digit) {                                                  
    lcd.value += digit;
}
//Funktionen addComma lägger till comma om vår boolean variabel är falsk.
//Annars gör den inget om du undrar Henrik....
function addComma() {                                                       
    if (hasComma == false) {                                                
        lcd.value = lcd.value + '.';
        hasComma = true;
    }
}
/**
 * Beräknar ovh visar resultatet på displayen.
 */
 //Där vi gör alla våra uträkningar. +, /, *, - you name it.
function calculate(e) {
    if (arithmetic === '+') {
        return Number(memory) + Number(lcd.value);                 
    }
    if (arithmetic === '/') {
        return Number(memory) / Number(lcd.value);
    }
    if (arithmetic === 'x') {
        return Number(memory) * Number(lcd.value);
    }
    if (arithmetic === '-') {
        return Number(memory) - Number(lcd.value);
    }
    if (arithmetic === '^') {
        return (Math.pow(memory, lcd.value));
    }
    if (arithmetic === 'SIN') {
        return (Math.sin(lcd.value));
    }
    if (arithmetic === 'COS') {
        return (Math.cos(lcd.value));
    }
    if (arithmetic === 'TAN') {
        return (Math.tan(lcd.value));
    }
    if (arithmetic === 'LOG') {
        return (Math.log10(lcd.value));
    }
    if (arithmetic === 'LN') {
        return (Math.log(lcd.value));
    }
}


/** Rensar display */
function clearLCD() {
    lcd.value = '';
}

/** Rensar allt, reset */
function memClear() {
    memory = 0;
    arithmetic = null;
    clearLCD();
    hasComma = false;
}

window.onload = init;
