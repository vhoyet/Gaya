export default class DialogueView {
    constructor(scene, npcX, npcY) {
        this.scene = scene;

        // Create the dialogue box UI
        this.dialogBox = this.scene.add.rectangle(npcX, npcY, 600, 100, 0x000000, 0.8).setOrigin(0.5);
        this.dialogText = this.scene.add.text(npcX - 280, npcY - 40, '', { fontSize: '18px', fill: '#fff' });

        this.dialogBox.setDepth(10);
        this.dialogText.setDepth(10);
        this.choiceButtons = [];
    }

    updateDialogue(text, choices) {
        this.dialogText.setText(text);

        // Clear old choices
        this.choiceButtons.forEach(button => button.destroy());
        this.choiceButtons = [];

        // Add new choices
        choices.forEach((choice, index) => {
            let button = this.scene.add.text(this.dialogBox.x + 300, this.dialogBox.y - 40 + index * 20, choice, {
                fontSize: '14px',
                fill: index === 0 ? '#ff0' : '#fff'
            });
            this.choiceButtons.push(button);
        });
    }

    highlightChoice(selectedIndex) {
        this.choiceButtons.forEach((button, index) => {
            if (button && button.setFill) {
                button.setFill(index === selectedIndex ? '#ff0' : '#fff');
            }
        });
    }

    destroy() {
        this.dialogBox.destroy();
        this.dialogText.destroy();
        this.choiceButtons.forEach(button => button.destroy());
        this.choiceButtons = [];
    }
}
