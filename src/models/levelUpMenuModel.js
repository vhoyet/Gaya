export default class LevelUpMenuModel {
    constructor(players) {
        this.choosingPlayer = true;
        this.players = players;
        this.playerModel = null;
        this.level = null;
        this.souls = null;
        this.listeners = [];
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener());
    }

    updatePlayerStats() {
        this.playerModel.stats = this.stats;
    }

    setPlayer(playerModel) {
        this.choosingPlayer = false;
        this.playerModel = playerModel;
        this.souls = playerModel.inventory.items["Soul"];
        this.level = playerModel.level;
        this.notifyListeners();
    }

    levelUp() {
        const cost = 50 * this.level; // Example cost per upgrade
        if (this.souls >= cost) {
            this.souls -= cost;
            this.playerModel.inventory.removeItem("Soul", cost);
            this.level += 1;
            this.playerModel.level += 1;
            this.playerModel.statPoints += 1;
            this.playerModel.updateStats();
            this.notifyListeners(); // Notify the view to update
        }
    }

    destroy() {
        this.listeners = []
    }
}
