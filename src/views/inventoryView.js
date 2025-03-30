export default class InventoryView {
    constructor(scene, inventoryModel) {
      this.scene = scene;
      this.model = inventoryModel;
      this.model.setView(this);
  
      // Positioning (adjust if needed)
      this.x = 20;
      this.y = 50; // Below health bar
  
      // Create a text object to display inventory (e.g., souls)
      this.inventoryText = this.scene.add.text(
        this.x, 
        this.y, 
        "0 Souls\n0 Wood\n0 Iron", 
        {
          fontSize: "10px",
          fontFamily: "Arial",
          color: "#add8e6", // Gold color
          align: "left",
        }
      );
      this.inventoryText.setScrollFactor(0);
      this.inventoryText.setDepth(20);
    }
  
    updateInventory(items) {
      const soulCount = items["Soul"] || 0;
      const woodCount = items["Wood"] || 0;
      const ironCount = items["Iron"] || 0;
      this.inventoryText.setText(`${soulCount} Souls\n${woodCount} Wood\n${ironCount} Iron`);
    }
  }
  