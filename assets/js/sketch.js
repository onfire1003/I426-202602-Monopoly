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
    fill('#242424');
    rect(1011, 36, 100, 100);

    //corner right top
    rect(1784, 36, 100, 100);

    //corner left bottom
    rect(1011, 809, 100, 100);

    //corner left bottom
    rect(1784, 809, 100, 100);

    //square
    for (let i = 0; i < 9; i++) {
        let color_top = ['#de1c1c', null, '#de1c1c', '#de1c1c', null, '#e8ee3a', '#e8ee3a', null, '#e8ee3a'];
        let color_right = ['#14a14a', '#14a14a', null, '#14a14a', null, null, '#3982e4', null, '#3982e4'];
        let color_bottom = [''];
        let color_left = ['white', 'black'];

        fill('#242424');
        //square top
        rect(1111 + (i * 75), 36, 75, 100);

        //square right
        rect(1784, 136 + (i * 75), 100, 75);

        //square bottom
        rect(1111 + (i * 75), 809, 75, 100);

        //square left
        rect(1011, 136 + (i * 75), 100, 75);

        //street top color
        stroke('white');
        fill('red');
        rect(1111 + (i * 75), 110, 75, 26);

        //street right color
        stroke('white');
        fill('red');
        rect(1784 , 136 + (i * 75), 26, 75);

        //street bottom color
        stroke('white');
        fill('red');
        rect(1111 + (i * 75) , 809 , 75,  26);

        //street left color
        stroke('white');
        fill('red');
        rect(1086, 136 +  (i * 75), 26, 75);

    }

}

/*
*  if (i === 0 || i === 2 || i === 3 || i === 5 || i === 6 || i === 8) {
            if (i === 0 || i === 2 || i === 3) {
                // couleur rouge
            }
            else {
                // couleur jaune
            }

        }
* */