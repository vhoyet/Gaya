export default class NpcModel {
    constructor(name, x, y, dialog) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.dialog = dialog; // Array of dialog lines
        this.view = null
    }

    setView(view) {
        this.view = view;
    }
}
