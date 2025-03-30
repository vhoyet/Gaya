import DialogueModel from '../models/dialogModel.js';
import DialogueView from '../views/dialogView.js';
import StatsMenuModel from '../models/statsMenuModel.js';
import StatsMenuView from '../views/statsMenuView.js';
import StatsMenuController from './statsMenuController.js';
import LevelUpMenuModel from '../models/levelUpMenuModel.js';
import LevelUpMenuView from '../views/levelUpMenuView.js';
import LevelUpMenuController from './levelUpMenuController.js';

export default class DialogueController {
    constructor(scene, name, npcX, npcY, dialogData) {
        this.scene = scene;
        this.model = new DialogueModel(dialogData);
        this.view = new DialogueView(scene, npcX, npcY);

        this.npcName = name;
        this.npcX = npcX;
        this.npcY = npcY;
        this.selectedIndex = 0;
        this.isDialogueActive = false;
        this.ischoiceActive = false;

        this.initInputHandlers();
    }

    startDialogue() {
        if (this.isDialogueActive) return;

        this.isDialogueActive = true;
        this.scene.dialogOpen = true; // 🚫 Stop player movement

        this.updateDialogue();
    }

    updateDialogue() {
        const currentDialogue = this.model.getCurrentDialogue();
        if (currentDialogue.choices.length > 0)
            this.ischoiceActive = true
        this.view.updateDialogue(currentDialogue.text, currentDialogue.choices);
    }

    advanceDialogue() {
        if (this.ischoiceActive) return
        
        if (this.model.advanceDialogue()) {
            this.updateDialogue();
        } else {
            this.cleanup();
        }
    }

    selectChoice() {
        if (this.ischoiceActive == false) return
        this.ischoiceActive = false;

        const currentDialogue = this.model.getCurrentDialogue();
        
        if (currentDialogue.choices[this.selectedIndex] == "View stats")
            this.openStatsMenu();
        else if(currentDialogue.choices[this.selectedIndex] == "Level up")
            this.openLevelUpMenu();
        else if(currentDialogue.choices[this.selectedIndex] == "Yes") {
            this.view.scene.events.emit("talked_to", this.npcName);
        }

        this.cleanup();
    }

    openStatsMenu() {
        if (this.statsView) return;

        this.statsModel = new StatsMenuModel(this.scene.players);
        this.statsMenuController = new StatsMenuController(this.scene, this.statsModel);
        this.statsView = new StatsMenuView(this.scene, {x: this.npcY, y: this.npcY}, this.statsModel, this.statsMenuController, () => {
            this.scene.dialogOpen = false;
            this.statsView = null;
            this.statsMenuController.destroy(); // Clean up input listeners
        });
    
    }

    openLevelUpMenu() {
        if (this.levelUpView) return;

        this.levelUpMenuModel = new LevelUpMenuModel(this.scene.players);
        this.levelUpMenuController = new LevelUpMenuController(this.scene, this.levelUpMenuModel);
        this.levelUpMenuView = new LevelUpMenuView(this.scene, {x: this.npcY, y: this.npcY}, this.levelUpMenuModel, this.levelUpMenuController, () => {
            this.scene.dialogOpen = false;
            this.levelUpMenuView = null;
            this.levelUpMenuController.destroy(); // Clean up input listeners
        });
    }

    highlightChoice(move) {
        this.selectedIndex = (this.selectedIndex + move + this.view.choiceButtons.length) % this.view.choiceButtons.length;
        this.view.highlightChoice(this.selectedIndex);
    }

    initInputHandlers() {
        this.keyListeners = {
            up: () => this.highlightChoice(-1),
            down: () => this.highlightChoice(1),
            enter: () => this.selectChoice(),
            space: () => this.advanceDialogue(),
        };
    
        this.scene.input.keyboard.on('keydown-UP', this.keyListeners.up);
        this.scene.input.keyboard.on('keydown-DOWN', this.keyListeners.down);
        this.scene.input.keyboard.on('keydown-ENTER', this.keyListeners.enter);
        this.scene.input.keyboard.on('keydown-SPACE', this.keyListeners.space);
    }

    cleanup() {
        this.scene.dialogOpen = false; // ✅ Allow player to move again
        this.view.destroy();
        
        // Remove key listeners
        this.scene.input.keyboard.off('keydown-UP', this.keyListeners.up);
        this.scene.input.keyboard.off('keydown-DOWN', this.keyListeners.down);
        this.scene.input.keyboard.off('keydown-ENTER', this.keyListeners.enter);
        this.scene.input.keyboard.off('keydown-SPACE', this.keyListeners.space);

        setTimeout(() => {
            this.model.resetDialogue();
            this.model = null;
            this.isDialogueActive = false;
        }, 500)
    }
}
