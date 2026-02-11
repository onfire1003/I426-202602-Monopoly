"use strict";
function setup() {
    createCanvas(windowWidth, windowHeight);
    background('blue');
}

function draw() {
    //draw game board
    // location (1011,36,   1886,36,   1011,911,    1886,911)
    let widthRect = 875;
    let heightRect = 875;

    noStroke();
    fill('#242424')
    rect(width - widthRect - 35, height / 2 - heightRect / 2, widthRect, heightRect);

    //draw square
    // corner left top
    stroke('white');
    fill ('white');
    rect (1011,36,100,100);

    //corner right top
    stroke('white');
    fill ('white');
    rect (1784,36,100,100);

    //corner left bottom
    stroke('white');
    fill ('white');
    rect (1011,809,100,100);

    //corner left bottom
    stroke('white');
    fill ('white');
    rect (1784,809,100,100);

    //square top
    for (let i=0; i < 9; i++){
        stroke('red');
        fill ('green');
        rect (1111 + (i * 75), 36, 75, 100);
    }

    //square right
    for (let i=0; i < 9; i++){
        stroke('red');
        fill ('green');
        rect (1784, 136 + (i * 75), 100, 75);
    }

    //square bottom
    for (let i=0; i < 9; i++){
        stroke('red');
        fill ('green');
        rect (1709 - (i * 75) ,809,75,100);
    }

    //square left
    for (let i=0; i < 9; i++){
        stroke('red');
        fill ('green');
        rect (1011, 136 + (i * 75), 100, 75);
    }


}