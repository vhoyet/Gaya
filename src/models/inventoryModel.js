export default class InventoryModel {
    constructor() {
      this.items = {}; // Store items as { itemName: quantity }
      this.view = null;
    }
  
    setView(view) {
      this.view = view;
    }

    landscapeToInventoryObject(landscape) {
      switch (landscape) {
        case "small_tree":
          return "Wood";
        case "iron_ore":
          return "Iron";
      }
    }
  
    addItem(itemName, amount = 1) {
      if (!this.items[itemName]) {
        this.items[itemName] = 0;
      }
      this.items[itemName] += amount;

      for (let i = 0; i < amount; i++) {
        this.view.scene.events.emit("item_collected", itemName);
      }
  
      if (this.view) {
        this.view.updateInventory(this.items);
      }
    }
  
    removeItem(itemName, amount = 1) {
      if (!this.items[itemName]) return;
      
      this.items[itemName] = Math.max(0, this.items[itemName] - amount);
  
      if (this.view) {
        this.view.updateInventory(this.items);
      }
    }

    loseItems(){
      this.items = {}
      this.view.updateInventory(this.items);
    }
  
    getItemCount(itemName) {
      return this.items[itemName] || 0;
    }
  }
  