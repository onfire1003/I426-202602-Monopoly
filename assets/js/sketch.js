"use strict";
// variables globales
let pawns = [];
let dices = [];

// argent des joueurs
let wallet = [
    1000, 1000, 1000, 1000,
    1000, 1000, 1000, 1000
];

// on garde les références des boutons si besoin
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

// ---------------- fonction play button ----------------
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

// ---------------- SETUP ----------------
function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    background('bisque');

    addGlobalButtonStyle()

    for (let i = 0; i < 8; i++) {
        const inventory_btn = createButton('Inventaire');
        inventory_btn.position(625, 75 + (i * 95));

        // ouvre une popup différente par joueur
        inventory_btn.mousePressed(() => {
            inventoryPopup(`inventaire-${i}`, `Inventaire du joueur ${i + 1}`);
        });

        // button zone action
        // buttom menu
        const menu_btn = createButton('Menu');
        menu_btn.position(60, 850);

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

        // buttom get out off jail
        const jail_btn = createButton('Sortir de prison');
        jail_btn.position(1380, 700);

        // buttom build
        const build_btn = createButton('Construire');
        build_btn.position(1590, 700);

        inventoryBtns.push(inventory_btn);
    }
}

// ---------------- DRAW ----------------
function draw() {
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

    let color_top = ['#de1c1c', '#242424', '#de1c1c', '#de1c1c', '#242424', '#e8ee3a', '#e8ee3a', '#242424', '#e8ee3a'];
    let color_right = ['#14a14a', '#14a14a', '#242424', '#14a14a', '#242424', '#242424', '#3982e4', '#242424', '#3982e4'];
    let color_bottom = ['#b9f1fb', '#b9f1fb', '#242424', '#b9f1fb', '#242424', '#242424', '#8c3916', '#242424', '#8c3916'];
    let color_left = ['#f0a933', '#f0a933', '#242424', '#f0a933', '#242424', '#f241a2', '#f241a2', '#242424', '#f241a2'];

    //square
    for (let i = 0; i < 9; i++) {
        fill('#242424');

        //square top
        if (color_top[i] === '#242424') { stroke('white'); } else { stroke(color_top[i]); }
        rect(1111 + (i * 75), 36, 73, 98);

        //square right
        if (color_right[i] === '#242424') { stroke('white'); } else { stroke(color_right[i]); }
        rect(1786, 136 + (i * 75), 98, 73);

        //square bottom
        if (color_bottom[i] === '#242424') { stroke('white'); } else { stroke(color_bottom[i]); }
        rect(1111 + (i * 75), 811, 73, 98);

        //square left
        if (color_left[i] === '#242424') { stroke('white'); } else { stroke(color_left[i]); }
        rect(1011, 136 + (i * 75), 98, 73);

        noStroke();
        //street top color
        fill(color_top[i]);
        rect(1112 + (i * 75), 108, 71, 26);

        //street right color
        fill(color_right[i]);
        rect(1787, 137 + (i * 75), 26, 71);

        //street bottom color
        fill(color_bottom[i]);
        rect(1112 + (i * 75), 811, 71, 26);

        //street left color
        fill(color_left[i]);
        rect(1083, 137 + (i * 75), 26, 71);
    }


    image(dices[2], 1325, 430, 100, 100);
    image(dices[2], 1475, 430, 100, 100);
}