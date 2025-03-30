export default class QuestModel {
    constructor(id, title, description, goal, onComplete, questLine = null, npcDialogUpdate = null) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.goal = goal; // Object { type: 'collect', target: 'gold', count: 10 }
      this.progress = 0;
      this.completed = false;
      this.onComplete = onComplete; // Callback function when quest completes
      this.questLine = questLine;
      this.npcDialogUpdate = npcDialogUpdate;
    }
  
    updateProgress(amount) {
      if (this.completed) return;
      
      this.progress += amount;
      if (this.progress >= this.goal.count) {
        return this.complete();
      }
    }
  
    complete() {
      this.completed = true;

      if (this.onComplete)
        this.onComplete(this);

      return this.completed;

    }
  }
  