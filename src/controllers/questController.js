import QuestModel from "../models/questModel.js";
import QuestLinesModel from "../models/questLinesModel.js"

export default class QuestsController {
  constructor(scene) {
    this.scene = scene;
    this.quests = new Map(); // Store quests by ID
    this.questLinesModel = new QuestLinesModel();
    this.startQuestLine("main")

    // Listaqen to relevant game events
    this.scene.events.on("enemy_killed", (enemyType) => this.updateQuests("kill", enemyType, 1));
    this.scene.events.on("item_collected", (itemType) => this.updateQuests("collect", itemType, 1));
    this.scene.events.on("leveled_up", (itemType) => this.updateQuests("level", itemType, 1));
    this.scene.events.on("talked_to", (itemType) => this.updateQuests("talk", itemType, 1));
    this.scene.events.on("stat_updated", (itemType) => this.updateQuests("stat", itemType, 1));
  }


  loadNextQuest(quest) {
    if (!quest.questLine) return;

    let currentQuestIndex = this.questLinesModel.questLines[quest.questLine].currentQuestIndex;
    console.log(currentQuestIndex, this.questLinesModel.questLines[quest.questLine].length)
    if (currentQuestIndex < this.questLinesModel.questLines[quest.questLine].length) {
      let newQuest = this.questLinesModel.questLines[quest.questLine].quests[currentQuestIndex];
      this.questLinesModel.questLines[quest.questLine].currentQuestIndex += 1;
      this.addQuest(newQuest);
    }
  }

  addQuest(quest) {
    if (!this.quests.has(quest.id)) {
      this.quests.set(quest.id, quest);
    }
  }

  startQuestLine(questId) {
    let quest = this.questLinesModel.questLines[questId].quests[0]
    this.addQuest(quest)
    this.questLinesModel.questLines[questId].currentQuestIndex += 1;
  }

  async updateQuests(type, target, amount) {
    this.quests.forEach((quest) => {
      if (!quest.completed && quest.goal.type === type && quest.goal.target === target) {
        if (quest.updateProgress(amount))
          setTimeout( () => this.loadNextQuest(quest), 300)
          

        if (!quest.npcDialogUpdate) return;

        let npcModel = this.scene.npcModels.find(npc => npc.name === quest.npcDialogUpdate.npcName);
        npcModel.dialog = quest.npcDialogUpdate.dialogLines;
      }
    });
  }

  getActiveQuests() {
    return [...this.quests.values()].filter(q => !q.completed);
  }
}
