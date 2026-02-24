"use strict";
function setup() {
    createCanvas(windowWidth, windowHeight);
    background('bisque');
}

function preload() {
    // load image dice
    dice_1 = loadImage('/assets/images/dice_1.png');
    dice_2 = loadImage('/assets/images/dice_2.png');
    dice_3 = loadImage('/assets/images/dice_3.png');
    dice_4 = loadImage('/assets/images/dice_4.png');
    dice_5 = loadImage('/assets/images/dice_5.png');
    dice_6 = loadImage('/assets/images/dice_6.png');

    // load image pawn
    pawn_0 = loadImage('/assets/images/pawn_0.png');
    pawn_1 = loadImage('/assets/images/pawn_1.png');
    pawn_2 = loadImage('/assets/images/pawn_2.png');
    pawn_3 = loadImage('/assets/images/pawn_3.png');
    pawn_4 = loadImage('/assets/images/pawn_4.png');
    pawn_5 = loadImage('/assets/images/pawn_5.png');
    pawn_6 = loadImage('/assets/images/pawn_6.png');
    pawn_7 = loadImage('/assets/images/pawn_7.png');

    pawns = [pawn_0, pawn_1, pawn_2, pawn_3, pawn_4, pawn_5, pawn_6, pawn_7];
}

function draw() {

    //draw users zones
    for (let i = 0; i < 8; i++){
        //draw background players
        stroke('white');
        fill('#242424');
        rect(75 , 75 + (i * 100), 750, 95);

        //draw icon players
        noStroke();
        image(pawns[i], 90, 75 + (i * 100) + 10, 75, 75);
    }

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
    rect(1011, 36, 98, 98);

    //corner right top
    rect(1786, 36, 98, 98);

    //corner left bottom
    rect(1011, 811, 98, 98);

    //corner left bottom
    rect(1786, 811, 98, 98);

    let color_top = ['#de1c1c', '#242424', '#de1c1c', '#de1c1c', '#242424', '#e8ee3a', '#e8ee3a', '#242424', '#e8ee3a'];
    let color_right = ['#14a14a', '#14a14a', '#242424', '#14a14a', '#242424', '#242424', '#3982e4', '#242424', '#3982e4'];
    let color_bottom = ['#b9f1fb', '#b9f1fb', '#242424', '#b9f1fb', '#242424',  '#242424', '#8c3916', '#242424', '#8c3916'];
    let color_left = ['#f0a933', '#f0a933', '#242424', '#f0a933', '#242424', '#f241a2', '#f241a2','#242424', '#f241a2'];

    //square
    for (let i = 0; i < 9; i++) {
        fill('#242424');

        //square top
        if (color_top[i] === '#242424') {
            stroke('white')
        }else {
            stroke(color_top[i]);
        }
        rect(1111 + (i * 75), 36, 73, 98);

        //square right
        if (color_right[i] === '#242424') {
            stroke('white')
        }else {
            stroke(color_right[i]);
        }
        rect(1786, 136 + (i * 75), 98, 73);

        //square bottom
        if (color_bottom[i] === '#242424') {
            stroke('white')
        }else {
            stroke(color_bottom[i]);
        }
        rect(1111 + (i * 75), 811, 73, 98);

        //square left
        if (color_left[i] === '#242424') {
            stroke('white')
        }else {
            stroke(color_left[i]);
        }
        rect(1011, 136 + (i * 75), 98, 73);

        noStroke();
        //street top color
        fill(color_top[i]);
        rect(1112 + (i * 75), 108, 71, 26);

        //street right color
        fill(color_right[i]);
        rect(1787 , 137 + (i * 75), 26, 71);

        //street bottom color
        fill(color_bottom[i]);
        rect(1112 + (i * 75) , 811 , 71,  26);

        //street left color
        fill(color_left[i]);
        rect(1083, 137 +  (i * 75), 26, 71);

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