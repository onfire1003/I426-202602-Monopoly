"use strict";

// fake gameboard for test
const GameBoard = [
    0, 1, 0, 1, 0, 0, 2, 0, 2, 2,
    0, 3, 0, 3, 3, 0, 4, 0, 4, 4,
    0, 5, 0, 5, 5, 0, 6, 6, 0, 6,
    0, 7, 7, 0, 7, 0, 0, 8, 0, 8
]


const StreetsColors = {
    1: "#8c3916",
    2: "#b9f1fb",
    3: "#f241a2",
    4: "#f0a933",
    5: "#de1c1c",
    6: "#e8ee3a",
    7: "#14a14a",
    8: "#3982e4"
}


// variables globales
let pawns = [];
let dices = [];

// abougersur un autre fichier
let wallet =[
    1000,
    1000,
    1000,
    1000,
    1000,
    1000,
    1000,
    1000
];

function preload() {
    // load dice
    dices = [
        loadImage('/assets/images/dice_1.png'),
        loadImage('/assets/images/dice_2.png'),
        loadImage('/assets/images/dice_3.png'),
        loadImage('/assets/images/dice_4.png'),
        loadImage('/assets/images/dice_5.png'),
        loadImage('/assets/images/dice_6.png')
    ];

    // load pawns
    pawns = [
        loadImage('/assets/images/pawn_0.png'),
        loadImage('/assets/images/pawn_1.png'),
        loadImage('/assets/images/pawn_2.png'),
        loadImage('/assets/images/pawn_3.png'),
        loadImage('/assets/images/pawn_4.png'),
        loadImage('/assets/images/pawn_5.png'),
        loadImage('/assets/images/pawn_6.png'),
        loadImage('/assets/images/pawn_7.png')
    ];
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    background('bisque');
}

function draw() {
    angleMode(DEGREES);


    //draw users zones
    for (let i = 0; i < 8; i++){
        //draw background players
        stroke('white');
        fill('#242424');
        rect(60 , 60 + (i * 95), 750, 80);

        //draw icon players
        noStroke();
        image(pawns[i], 70, 78 + (i * 95), 45, 45);

        //draw wallet players
        textSize(32);
        fill("white");

        push();
        translate(300, 93 + (i * 95));
        rotate(180);
        text('₩', 0, 0);
        pop();

        text(': '+wallet[i], 300, 115 + (i * 95))
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

    //square
    for (let i = 0; i < 9; i++) {
        fill('#242424');

        //square top
        stroke('white')
        rect(1111 + (i * 75), 36, 73, 98);

        //square right
        stroke('white')
        rect(1786, 136 + (i * 75), 98, 73);

        //square bottom
        stroke('white')
        rect(1111 + (i * 75), 811, 73, 98);

        //square left
        stroke('white')
        rect(1011, 136 + (i * 75), 98, 73);

        noStroke();

        // put streets colors based on a board list
        for (let i = 0; i < GameBoard.length; i++) {
            if (GameBoard[i] !== 0) {
                // right
                if (i > 30) {
                    fill(StreetsColors[GameBoard[i]]);
                    rect(1787, 62 + ((i - 30) * 75), 26, 71);
                }
                // top
                else if (i > 20) {
                    fill(StreetsColors[GameBoard[i]]);
                    rect(1037 + ((i - 20) * 75), 108, 71, 26);
                }
                // left
                else if (i > 10) {
                    fill(StreetsColors[GameBoard[i]]);
                    rect(1083, 812 + (-(i - 10) * 75), 26, 71);
                }
                // bottom
                else {
                    fill(StreetsColors[GameBoard[i]]);
                    rect(1787 + (-i * 75), 811, 71, 26);
                }
            }
        }
    }

    image(dices[2], 1000, 1000, 100, 100);

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