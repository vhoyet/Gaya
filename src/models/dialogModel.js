export default class DialogueModel {
    constructor(dialogLines) {
        this.dialogLines = dialogLines; // Stores dialogue array
        this.currentIndex = 0;
    }

    getCurrentDialogue() {
        return this.dialogLines[this.currentIndex];
    }

    advanceDialogue() {
        this.currentIndex++;
        return this.currentIndex < this.dialogLines.length;
    }

    resetDialogue() {
        this.currentIndex = 0;
    }
}
