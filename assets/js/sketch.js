"use strict";

import Dice from "./class/dice.js";

// fake gameboard for test
const GameBoard = [
    0, 1, 0, 1, 0, 0, 2, 0, 2, 2,
    0, 3, 0, 3, 3, 0, 4, 0, 4, 4,
    0, 5, 0, 5, 5, 0, 6, 6, 0, 6,
    0, 7, 7, 0, 7, 0, 0, 8, 0, 8
]

const GameBoardPrice = [
    0, 100, 0, 100, 0, 100, 100, 0, 100, 100,
    0, 100, 100, 100, 100, 100, 100, 0, 100, 100,
    0, 100, 0, 100, 100, 100, 100, 100, 100, 100,
    0, 100, 100, 0, 100, 100, 0, 100, 0, 100,
]

const GameBoardName = [
    "départ", "brown", "community", "brown", "taxe", "gare", "cyan", "chance", "cyan", "cyan",
    "prison", "magenta", "entreprise\nd\'énergie", "magenta", "magenta", "gare", "orange", "community", "orange", "orange",
    "parking\ngratuit", "red", "chance", "red", "red", "gare", "yellow", "yellow", "entreprise\nd\'eau", "yellow",
    "aller en\nprison", "green", "green", "community", "green", "gare", "chance", "blue", "taxe", "blue",
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
let diceImages = [];

// Objects
let dice_1;
let dice_2;

// argent des joueurs
let wallet = [
    1500, 1500, 1500, 1500,
    1500, 1500, 1500, 1500
];

// on garde les références des boutons si besoin
let inventoryBtns = [];

let n = window.nbPlayers || 0;

// ---------------- Style ----------------
function addGlobalButtonStyle() {
    const css = `
        button {
            width: 150px;
            height: 50px;
            background-color: #4F46E5;
            color: white;
            border: none;
            border-radius: 15px;
            font-size: 17px;
            font-family: system-ui, sans-serif;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: 0.2s;
        }

        button:hover {
            background-color: #4338CA;
            transform: scale(1.05);
        }

        button:active {
            transform: scale(0.97);
        }
    `;

    const styleTag = createElement('style', css);
    styleTag.parent(document.head);
}

// ---------------- fonction play button ----------------
function inventoryPopup(id, message) {
    let oldPopup = select(`#popup-${id}`);
    if (oldPopup) oldPopup.remove();

    let popupBg = createDiv('').id(`popup-${id}`);

    let popup = createDiv('');
    popup.parent(popupBg);

    let text = createP(message);
    text.parent(popup);
    text.style('margin', '0 0 12px 0');

    let closeBtn = createButton("Fermer");
    closeBtn.parent(popup);

    closeBtn.mousePressed(() => popupBg.remove());
}

function throwTheDices(dice_1, dice_2) {
    dice_1.throwDice();
    dice_2.throwDice();
}

// ---------------- ASSETS ----------------
window.preload = function() {
    // load dice
    diceImages = [
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


window.setup = function() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    background('bisque');

    dice_1 = new Dice(diceImages, [1325, 430, 100, 100]);
    dice_2 = new Dice(diceImages, [1475, 430, 100, 100]);

    addGlobalButtonStyle()
    let n = window.nbPlayers || 0;

    for (let i = 0; i < n; i++) {
        const inventory_btn = createButton('Inventaire');
        inventory_btn.position(625, 75 + (i * 95));
        inventory_btn.mousePressed(() => {
            inventoryPopup(`inventaire-${i}`, `Inventaire du joueur ${i + 1}`);
        });
}
    // button zone action
    // buttom menu
    const menu_btn = createButton('Menu');
    menu_btn.position(60, 850);
    menu_btn.mousePressed(openMenu);

    // buttom change
    const change_btn = createButton('Echange');
    change_btn.position(360, 850);

    // buttom sell
    const sell_btn = createButton('Vendre');
    sell_btn.position(660, 850);

    // button board game
    // buttom roll
    const roll_btn = createButton('Lancer les dés');
    roll_btn.position(1170, 700);
    roll_btn.mousePressed(() => {
        throwTheDices(dice_1, dice_2);
    });

    // buttom get out off jail
    const jail_btn = createButton('Sortir de prison');
    jail_btn.position(1380, 700);
    // Store a reference
    inventoryBtns.push(inventory_btn);
}

/**
 * Updates a player's balance.
 * Returns true if successful, false otherwise.
 */
function updateWallet(playerIndex, amount) {
    // Check if the player exists (index between 0 and 7)
    if (wallet[playerIndex] === undefined) {
      console.error("Error: This player doesn't exist!");
      alert("Wait, we couldn't find that player in the game.");
      return false;
    }

    // Check if player has enough money for the payment
    if (wallet[playerIndex] + amount < 0) {
      console.warn("Insufficient funds!");
      alert("Sorry, you don't have enough money for this!");
      return false;
    }

    // Apply transaction and update balance
    wallet[playerIndex] += amount;
    console.log("Success! Player " + (playerIndex + 1) + " updated.");
    return true;
}

window.draw = function() {
    //draw users zones
    //draw background players
    for (let i = 0; i < window.nbPlayers; i++) {
        stroke('white');
        fill('#242424');
        rect(60, 60 + (i * 95), 750, 80);

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

        text(': ' + wallet[i], 300, 115 + (i * 95));
    }

    triangle(120, 100, 150, 90, 150, 110);

    //draw game board
    let widthRect = 875;
    let heightRect = 875;

    noStroke();
    fill('#242424');
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

    //corner right bottom
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

        // put info on tiles
        for (let i = 0; i < GameBoard.length; i++) {
            // street colors
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
            // price
            textSize(16);
            fill("white");
            if (GameBoardPrice[i] !== 0) {
                // right
                if (i > 30) {
                    push();
                    textAlign(LEFT);
                    translate(1845, 128 + ((i - 30) * 75)); // 126 + 2
                    rotate(0);
                    text(GameBoardPrice[i], 0, 0);
                    pop();
                    push();
                    textAlign(LEFT);
                    translate(1841, 116 + ((i - 30) * 75)); // 114 + 2
                    rotate(180);
                    text('₩', 0, 0);
                    pop();
                }
                // top
                else if (i > 20) {
                    push();
                    textAlign(LEFT);
                    translate(1068 + ((i - 20) * 75), 106); // 1060 + 8
                    rotate(0);
                    text(GameBoardPrice[i], 0, 0);
                    pop();
                    push();
                    textAlign(LEFT);
                    translate(1064 + ((i - 20) * 75), 94); // 1056 + 8
                    rotate(180);
                    text('₩', 0, 0);
                    pop();
                }
                // left
                else if (i > 10) {
                    push();
                    textAlign(LEFT);
                    translate(1047, 876 + (-(i - 10) * 75)); // 1050 - 3
                    rotate(0);
                    text(GameBoardPrice[i], 0, 0);
                    pop();
                    push();
                    textAlign(LEFT);
                    translate(1043, 864 + (-(i - 10) * 75)); // 1046 - 3
                    rotate(180);
                    text('₩', 0, 0);
                    pop();
                }
                // bottom
                else {
                    push();
                    translate(1810 + (-i * 75), 892);
                    rotate(180);
                    text('₩', 0, 0);
                    pop();
                    text(GameBoardPrice[i], 1815 + (-i * 75), 905)
                }
            }
            textSize(14);
            textAlign(CENTER);
            // corners
            if (i === 0 || i === 10 || i === 20 || i === 30) {
                if (i === 0)  text(GameBoardName[i], 1835, 870);
                if (i === 10) text(GameBoardName[i], 1060, 870);
                if (i === 20) text(GameBoardName[i], 1060, 85);
                if (i === 30) text(GameBoardName[i], 1835, 85);
            }
            // right
            else if (i > 30) {
                push();
                translate(1845, 100 + ((i - 30) * 75));
                rotate(0);
                text(GameBoardName[i], 0, 0)
                pop();
            }
            // top
            else if (i > 20) {
                push();
                translate(1075 + ((i - 20) * 75), 69);
                rotate(0);
                text(GameBoardName[i], 0, 0)
                pop();
            }
            // left.
            else if (i > 10) {
                push();
                translate(1052, 840 + (-(i - 10) * 75));
                rotate(0);
                text(GameBoardName[i], 0, 0)
                pop();
            }
            // bottom
            else {
                text(GameBoardName[i], 1822 + (-i * 75), 870)
            }
            textAlign(LEFT);
        }
    }

    dice_1.displayDice();
    dice_2.displayDice();
}