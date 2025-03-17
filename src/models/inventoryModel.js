export default class InventoryModel {
    constructor() {
      this.items = {}; // Store items as { itemName: quantity }
      this.view = null;
    }
  
    setView(view) {
      this.view = view;
    }
  
    addItem(itemName, amount = 1) {
      if (!this.items[itemName]) {
        this.items[itemName] = 0;
      }
      this.items[itemName] += amount;
  
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
  
    getItemCount(itemName) {
      return this.items[itemName] || 0;
    }
  }
  