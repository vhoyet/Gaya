export default class NpcView extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, model, startFrame) {
        super(scene, model.x, model.y, model.name);
        this.scene = scene;
        this.model = model;
        this.startFrame = startFrame;

        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setDepth(10);
        this.setImmovable(true);

        // Interaction prompt
        this.interactText = scene.add.text(this.x, this.y - 50, '', { fontSize: '16px', fill: '#fff' });
        this.interactText.setOrigin(0.5);
        this.interactText.setVisible(false);
        this.interactText.setDepth(20)
        this.createAnimations();
        this.play(`${this.model.name}_idle`);
        this.model.setView(this)
    }
    
    createAnimations() {
        this.anims.create({
            key: `${this.model.name}_idle`,
            frames: this.anims.generateFrameNumbers(this.model.name, { start: this.startFrame, end: this.startFrame+3 }),
            frameRate: 6,
            repeat: -1
        });
    }
}
