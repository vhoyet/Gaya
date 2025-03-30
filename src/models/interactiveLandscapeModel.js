export default class interactiveLandscapeModel {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.health = 3;
        this.isDead = false;
        this.respawnTime = 5000; // 5 seconds respawn
        this.view = null;
        this.type = type;
    }

    setView(view) {
        this.view = view;
    }

    takeDamage(player) {
        if (this.isDead) return;

        this.health -= 1;
        var inventoryObject = player.inventory.landscapeToInventoryObject(this.type)
        player.inventory.addItem(inventoryObject, 1);

        this.view.takeDamage()
        if (this.health <= 0) {
            this.isDead = true;
            this.view.destroyTree()
            return true; // Tree should be destroyed
        }
        return false; // Tree is still alive
    }

    reset() {
        this.health = 3;
        this.isDead = false;
    }


}
