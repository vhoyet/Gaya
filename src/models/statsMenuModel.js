export default class StatsMenuModel {
    constructor(players) {
        this.choosingPlayer = true;
        this.players = players;
        this.playerModel = null;
        this.stats = null;
        this.statPoints = null;
        this.listeners = [];
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener());
    }

    setPlayer(playerModel) {
        this.choosingPlayer = false;
        this.playerModel = playerModel;
        this.stats = playerModel.stats;
        this.statPoints = playerModel.statPoints;
        this.notifyListeners();
    }

    upgradeStat(stat) {
        const cost = 1; // Example cost per upgrade
        if (this.statPoints >= cost) {
            this.statPoints -= cost;
            this.playerModel.statPoints -= cost;
            this.playerModel.stats[stat] += 1;
            this.playerModel.updateStats();
            this.notifyListeners(); // Notify the view to update
        }
    }

    destroy() {
        this.listeners = []
    }
}
