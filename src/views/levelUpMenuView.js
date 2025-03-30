export default class LevelUpMenuView {
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
            this.levelUpView()


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

    levelUpView() {
        const { souls, level } = this.model;
        const selectedIndex = this.controller.selectedIndex ?? 0;

        let text = `Level : ${level}\nSouls : ${souls} (-${level * 50} Souls) \n\n`;

        text += (0 === selectedIndex ? "➡ " : "   ") + "Level up\n";
        text += `\n${selectedIndex === 1 ? "➡ " : "   "}Exit`;
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
