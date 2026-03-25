"use strict";

export default class Tile {
    /**
     * Creates a new tile
     * @param type the type of the tile (color start ect)
     * @param name the of the tile to show
     * @param action the action done when landed on the tile
     * @param object
     * @param coords tile coordonate
     * @param.owner
     */
    constructor(type, name, object, action, coords = { x: 0, y: 0 }, owner){
        this.type = type;
        this.name = name;
        this.object= object;
        this.action = action;
        this.coords = coords;
        this.owner = null;
    }
}