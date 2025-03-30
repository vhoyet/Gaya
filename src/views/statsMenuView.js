export default class StatsMenuView {
    constructor(scene, position, model, controller) {
        this.scene = scene;
        this.model = model;
        this.controller = controller;
        this.x = position.x;
        this.y = position.y;

        this.createMenu();
        this.listener = () => this.updateView(); 
        this.model.addListener(this.listener); // Listen for model changes
    }

    createMenu() {
        this.menuBox = this.scene.add.rectangle(this.x, this.y, 400, 300, 0x222222, 0.8).setOrigin(0.5);
        this.text = this.scene.add.text(this.x - 180, this.y - 100, ``, { fontSize: '18px', fill: '#fff' });
        this.updateView();
    }

    updateView() {
        if (!this.controller) return;

        if (this.model.choosingPlayer)
            this.updatePlayersView()
        else
            this.updateStatsView()


    }

    updatePlayersView() {
        const selectedIndex = this.controller.selectedIndex ?? 0;
        const players = this.model.players

        let text = "Choose a player :\n\n";

        players.forEach((players, index) => {
            text += (index === selectedIndex ? "➡ " : "   ") + `${players.model.name}\n`;
        });

        text += `\n${selectedIndex === players.length ? "➡ " : "   "}Exit`;

        this.text.setText(text);

        if (this.controller.shouldCloseMenu) {
            this.destroy();
        }
    }

    updateStatsView() {
        const { stats, statPoints } = this.model;
        const selectedIndex = this.controller.selectedIndex ?? 0;
        const statsKeys = Object.keys(stats);

        let text = `Stat points: ${statPoints}\n\n`;

        statsKeys.forEach((stat, index) => {
            text += (index === selectedIndex ? "➡ " : "   ") + `${stat}: ${stats[stat]}\n`;
        });

        text += `\n${selectedIndex === statsKeys.length ? "➡ " : "   "}Exit`;

        this.text.setText(text);

        if (this.controller.shouldCloseMenu) {
            this.destroy();
        }
    }

    destroy() {
        this.model.listeners = this.model.listeners.filter(l => l !== this.listener); // Remove the listener
        this.menuBox.destroy();
        this.text.destroy();
        this.controller.destroy();
    }
}
