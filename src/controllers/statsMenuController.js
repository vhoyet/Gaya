export default class StatsMenuController {
    constructor(scene, model) {
        this.scene = scene;
        this.model = model;
        this.selectedIndex = 0;
        this.statsKeys = null;
        this.playerModels = model.players.map(playerController => playerController.model);
        this.scene.menuOpen = true;
        this.shouldCloseMenu = false;

        // Key bindings
        this.initInputHandlers();
    }

    
    initInputHandlers() {
        this.keyListeners = {
            up: () => this.moveSelection(-1),
            down: () => this.moveSelection(1),
            enter: () => this.selectOption(),
        };
    
        this.scene.input.keyboard.on('keydown-UP', this.keyListeners.up);
        this.scene.input.keyboard.on('keydown-DOWN', this.keyListeners.down);
        this.scene.input.keyboard.on('keydown-ENTER', this.keyListeners.enter);
    }

    moveSelection(direction) {
        if (this.model.choosingPlayer) {
            const totalOptions = this.playerModels.length + 1;
            this.selectedIndex = (this.selectedIndex + direction + totalOptions) % totalOptions;
            this.model.notifyListeners(); // Update view
        } else {
            const totalOptions = this.statsKeys.length + 1;
            this.selectedIndex = (this.selectedIndex + direction + totalOptions) % totalOptions;
            this.model.notifyListeners(); // Update view
        }
    }

    selectOption() {
        if (this.model.choosingPlayer) {
            if (this.selectedIndex === this.playerModels.length) {
                this.scene.menuOpen = false;
                this.shouldCloseMenu = true;
                this.model.notifyListeners();
            } else {
                const playerModel = this.playerModels[this.selectedIndex];
                this.statsKeys = Object.keys(playerModel.stats);
                this.selectedIndex = 0;
                this.model.setPlayer(playerModel);
            }
        } else {
            if (this.selectedIndex === this.statsKeys.length) {
                this.scene.menuOpen = false;
                this.shouldCloseMenu = true;
                this.model.notifyListeners();
            } else {
                const stat = this.statsKeys[this.selectedIndex];
                this.model.upgradeStat(stat);
                this.scene.events.emit("stat_updated", "");
            }
        }
    }

    destroy() {
        this.scene.input.keyboard.off('keydown-UP', this.keyListeners.up);
        this.scene.input.keyboard.off('keydown-DOWN', this.keyListeners.down);
        this.scene.input.keyboard.off('keydown-ENTER', this.keyListeners.enter);
    }
}
