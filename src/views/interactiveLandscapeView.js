export default class interactiveLandscapeView extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, model, texture) {
        super(scene, model.x, model.y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        

        this.setOrigin(0.5, 1);
        this.setImmovable(true);

        this.model = model; // Attach model
        this.model.setView(this);
    }

    takeDamage(amount) {
        this.setTint(0xff0000); // Flash red
        this.scene.time.delayedCall(200, () => this.clearTint(), []);
    }

    destroyTree() {
        this.setVisible(false);
        this.setActive(false);
        this.body.enable = false;

        this.scene.time.delayedCall(this.model.respawnTime, () => this.respawnTree());
    }

    respawnTree() {
        this.model.reset();
        this.setPosition(this.model.x, this.model.y);
        this.setVisible(true);
        this.setActive(true);
        this.body.enable = true;
    }
}
