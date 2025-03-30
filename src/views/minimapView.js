export default class MinimapView {
    constructor(scene, model) {
        this.model = model;
        this.scene = scene;

        this.drawMinimap()
    }

    drawMinimap() {
        this.model.minimap = this.scene.add.renderTexture(this.model.minimapX, this.model.minimapY, this.model.minimapSize, this.model.minimapSize);
        this.model.minimap.setDepth(10);
        this.scene.tilesLayer.setScale(this.model.minimapScale);
        this.model.minimap.draw(this.model.tilesLayer, 0, 0, this.model.minimapScale, this.model.minimapScale);
        this.scene.tilesLayer.setScale(1);
        this.model.minimap.setScrollFactor(0);
    
        this.minimapBorder = this.scene.add.graphics();
        this.minimapBorder.setDepth(9);
        this.minimapBorder.fillStyle(0x000000, 1);
        this.minimapBorder.fillRect(this.model.minimapX - 2, this.model.minimapY - 2, this.model.minimapSize + 4, this.model.minimapSize + 4);
        this.minimapBorder.setScrollFactor(0);

        this.model.minimapCamera = this.scene.add.graphics();
        this.model.minimapCamera.fillStyle(0xff0000, 0.3);
        this.model.minimapCamera.fillRect(this.model.minimapX + this.model.minimapCamX, this.model.minimapY + this.model.minimapCamY, this.model.minimapCamW, this.model.minimapCamH);
        this.model.minimapCamera.setDepth(11); // Ensure it's above the minimap
        this.model.minimapCamera.setScrollFactor(0);

        this.model.minimapPlayer = this.scene.add.graphics();
        this.model.minimapPlayer.fillStyle(0x0000ff, 1);
        this.model.minimapPlayer.fillCircle(this.model.minimapX + this.model.minimapCamX + this.model.minimapCamW / 2, this.model.minimapY + this.model.minimapCamY + this.model.minimapCamH / 2, 2);
        this.model.minimapPlayer.setDepth(12);
        this.model.minimapPlayer.setScrollFactor(0);
    }

    updateMinimap() {
        this.model.updateMinimap();
    
        this.model.minimapCamera.clear();
        this.model.minimapCamera.fillStyle(0xff0000, 0.3);
        this.model.minimapCamera.setDepth(11); // Ensure it's above the minimap
        this.model.minimapCamera.fillRect(this.model.minimapX + this.model.minimapCamX, this.model.minimapY + this.model.minimapCamY, this.model.minimapCamW, this.model.minimapCamH);

        this.model.minimapPlayer.clear();
        this.model.minimapPlayer.fillStyle(0x0000ff, 1);
        this.model.minimapPlayer.fillCircle(this.model.minimapX + this.model.minimapCamX + this.model.minimapCamW / 2, this.model.minimapY + this.model.minimapCamY + this.model.minimapCamH / 2, 2);
        this.model.minimapPlayer.setDepth(12);
    }
}