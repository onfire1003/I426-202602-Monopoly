"use strict";
import Game from "./class/game.js";

const game = new Game(8);
window.game = game;
window.movePlayer = movePlayer;     // <--- AJOUTE ÇA
window.updateWallet = updateWallet;
const GameBoard = game.board.map(tile => tile.type);
const GameBoardPrice = game.board.map(tile => tile.price);
const GameBoardName = game.board.map(tile => tile.name);

console.log(game.players);

const StreetsColors = {
    "brown": "#8c3916",
    "cyan": "#b9f1fb",
    "magenta": "#f241a2",
    "orange": "#f0a933",
    "red": "#de1c1c",
    "yellow": "#e8ee3a",
    "green": "#14a14a",
    "blue": "#3982e4"
// A FAIRE !!!
}

// global variables
let pawns = [];
let dices = [];

// keep button references if needed
let inventoryBtns = [];

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

// ---------------- play button function ----------------
function inventoryPopup(id, message) {
    let oldPopup = select(`#popup-${id}`);
    if (oldPopup) oldPopup.remove();

    let popupBg = createDiv('').id(`popup-${id}`);
    popupBg.style('position', 'fixed');
    popupBg.style('left', '0');
    popupBg.style('top', '0');
    popupBg.style('width', '100vw');
    popupBg.style('height', '100vh');
    popupBg.style('background', 'rgba(0,0,0,0.6)');
    popupBg.style('display', 'flex');
    popupBg.style('justify-content', 'center');
    popupBg.style('align-items', 'center');
    popupBg.style('backdrop-filter', 'blur(3px)');
    popupBg.style('z-index', '999');

    let popup = createDiv('');
    popup.parent(popupBg);
    popup.style('background', 'white');
    popup.style('padding', '20px');
    popup.style('width', '280px');
    popup.style('border-radius', '10px');
    popup.style('text-align', 'center');
    popup.style('font-family', 'system-ui, sans-serif');

    let text = createP(message);
    text.parent(popup);
    text.style('margin', '0 0 12px 0');

    let closeBtn = createButton("Fermer");
    closeBtn.parent(popup);
    closeBtn.style('margin-top', '10px');
    closeBtn.style('padding', '8px 15px');
    closeBtn.style('background', '#4F46E5');
    closeBtn.style('color', 'white');
    closeBtn.style('border', 'none');
    closeBtn.style('border-radius', '6px');
    closeBtn.style('cursor', 'pointer');

    closeBtn.mousePressed(() => popupBg.remove());
}

// ---------------- ASSETS ----------------
window.preload = function() {
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

window.setup = function() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    background('bisque');

    addGlobalButtonStyle()

    for (let i = 0; i < 8; i++) {
        const inventory_btn = createButton('Inventaire');
        inventory_btn.position(625, 75 + (i * 95));

        // opens a different popup per player
        inventory_btn.mousePressed(() => {
            inventoryPopup(`inventaire-${i}`, `Inventaire du joueur ${i + 1}`);
        });

        // button zone action
        // button menu
        const menu_btn = createButton('Menu');
        menu_btn.position(60, 850);

        // button change
        const change_btn = createButton('Echange');
        change_btn.position(360, 850);

        // button sell
        const sell_btn = createButton('Vendre');
        sell_btn.position(660, 850);

        // button board game
        // button roll
        const roll_btn = createButton('Lancer les dés');
        roll_btn.position(1170, 700);

        // button get out off jail
        const jail_btn = createButton('Sortir de prison');
        jail_btn.position(1380, 700);

        // button build
        const build_btn = createButton('Construire');
        build_btn.position(1590, 700);

        inventoryBtns.push(inventory_btn);
    }
}

window.draw = function() {
    //draw users zones
    for (let i = 0; i < 8; i++) {
        //draw background players
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

        text(': ' + game.players[i].money, 300, 115 + (i * 95));
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
            if (StreetsColors[GameBoard[i]]) {
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
                    translate(1868, 110 + ((i - 30) * 75));
                    rotate(90);
                    text('₩', 0, 0);
                    pop();
                    push();
                    translate(1880, 105 + ((i - 30) * 75));
                    rotate(-90);
                    text(GameBoardPrice[i], 0, 0)
                    pop();
                }
                // top
                else if (i > 20) {
                    text('₩', 1085 + ((i - 20) * 75), 52);
                    push();
                    translate(1080 + ((i - 20) * 75), 40);
                    rotate(180);
                    text(GameBoardPrice[i], 0, 0)
                    pop();
                }
                // left
                else if (i > 10) {
                    push();
                    translate(1028, 840 + (-(i - 10) * 75));
                    rotate(-90);
                    text('₩', 0, 0);
                    pop();
                    push();
                    translate(1015, 845 + (-(i - 10) * 75));
                    rotate(90);
                    text(GameBoardPrice[i], 0, 0)
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
            // right
            if (i > 30) {
                push();
                translate(1850, 100 + ((i - 30) * 75));
                rotate(-90);
                text(GameBoardName[i], 0, 0)
                pop();
            }
            // top
            else if (i > 20) {
                push();
                translate(1075 + ((i - 20) * 75), 75);
                rotate(180);
                text(GameBoardName[i], 0, 0)
                pop();
            }
            // left
            else if (i > 10) {
                push();
                translate(1055, 850 + (-(i - 10) * 75));
                rotate(90);
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

    image(dices[2], 1325, 430, 100, 100);
    image(dices[2], 1475, 430, 100, 100);
}

// ---------------- Banking & Movement Logic ----------------

/**
 * Updates a player's wallet balance
 * @param {number} playerIndex - Index of the player (0 to 7)
 * @param {number} amount - Amount to add (positive) or subtract (negative)
 */
function updateWallet(playerIndex, amount) {
    const player = game.players[playerIndex];

    if (!player) {
        console.error("Player index not found.");
        return false;
    }

    // Check for insufficient funds
    if (player.money + amount < 0) {
        console.warn("Insufficient funds for player " + (playerIndex + 1));
        return false;
    }

    // Apply transaction
    player.money += amount;
    return true;
}

/**
 * Moves player and rewards 200 if passing through the GO tile (index 0)
 * @param {number} playerIndex - Index of the player moving
 * @param {number} diceRoll - Total value of the dice roll
 */
function movePlayer(playerIndex, diceRoll) {
    const player = game.players[playerIndex];

    // Ensure position exists
    if (player.position === undefined) player.position = 0;

    const oldPos = player.position;
    const newPos = (oldPos + diceRoll) % 40;

    // If new position is lower than old position, player passed GO
    if (newPos < oldPos) {
        console.log("Passed GO! Player " + (playerIndex + 1) + " receives 200₩");
        updateWallet(playerIndex, 200);
    }

    player.position = newPos;
}