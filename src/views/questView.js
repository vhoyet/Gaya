export default class QuestView {
    constructor(scene, questManager) {
        this.scene = scene;
        this.questManager = questManager;

        this.cam = this.scene.cameras.main;
        this.camW = this.cam.width;
        this.camH = this.cam.height;
        console.log(this.camW, this.cam)
        
        this.panel = scene.add.rectangle(this.camW - 200 - 20, 20, 200, 100, 0x000000, 0.5).setOrigin(0);
        this.titleText = scene.add.text(this.camW - 200 - 10, 30, "Quests", { fontSize: "16px", fill: "#fff" });
        this.questText = scene.add.text(this.camW - 200 - 10, 50, "", { fontSize: "12px", fill: "#fff" });
        this.panel.setScrollFactor(0);
        this.titleText.setScrollFactor(0);
        this.questText.setScrollFactor(0);
    }
  
    update() {
        const activeQuests = this.questManager.getActiveQuests();
        let questString = activeQuests.map(q => `${q.title}: ${q.progress}/${q.goal.count}`).join("\n");
  
        this.questText.setText(questString || "No active quests");
    }
  }
  