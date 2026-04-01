/***********************************************************************************************************************
 * Program name :           tile.js
 * Description :            the class for the tiles
 * Author :                 Cédric Jankiewicz
 * Creation date :          4.03.2026
 * Modified by :            Cédric Jankiewicz
 * Modification date :      24.03.2026
 * Version :                0.1.5
 **********************************************************************************************************************/
"use strict";

export default class Tile {
    /**
     * Creates a new tile
     * @param type the type of the tile (color start ect)
     * @param name the of the tile to show
     * @param action the action done when landed on the tile
     * @param object
     * @param coords tile coordonate
     * @param.ownedby
     */
    constructor(type, name, object, action, coords = { x: 0, y: 0 }, ownedby = -1){
        this.type = type;
        this.name = name;
        this.object= object;
        this.action = action;
        this.coords = coords;
        this.ownedby = ownedby;
    }
    getRent(p1, p2){
        switch(this.type){
            case "station":
                this.object.rent

            case "company":
                pass
            default:
        }
    }
}