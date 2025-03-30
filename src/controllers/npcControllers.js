import DialogueController from './dialogController.js';

export default class NpcController {
    constructor(scene, model) {
        this.scene = scene;
        this.model = model;
        this.dialogueController = null;
    }

    update(time, delta) {
        const distance = Phaser.Math.Distance.Between(this.model.x, this.model.y, this.scene.playerModel.x, this.scene.playerModel.y);
        if (distance < 100 && !this.scene.dialogOpen && !this.scene.menuOpen) {
            this.model.view.interactText.setText('Press SPACE to talk');
            this.model.view.interactText.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(this.scene.spaceKey)) {
                this.startDialogue();
            }
        } else {
            this.model.view.interactText.setVisible(false);
        }
    }

    startDialogue() {
        if (this.dialogueController?.isDialogueActive) return; // Prevent duplicate dialogues
        this.dialogueController = new DialogueController(this.scene, this.model.name, this.model.x, this.model.y, this.model.dialog);
        this.dialogueController.startDialogue();
    }
}
