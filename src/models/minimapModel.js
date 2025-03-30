export default class MinimapModel {
    constructor(camera, map, tilesLayer) {
        this.tilesLayer = tilesLayer;
        this.map = map;
        this.cam = camera;
        this.camW = this.cam.width;
        this.camH = this.cam.height;

        this.minimapSize = 125;
        this.minimapX = this.camW - this.minimapSize - 20; // 20px from the right edge
        this.minimapY = this.camH - this.minimapSize - 20;
        this.minimapScale = this.minimapSize / this.map.widthInPixels;
        this.minimap = null;

        this.minimapCamX = this.cam.worldView.x * this.minimapScale;
        this.minimapCamY = this.cam.worldView.y * this.minimapScale;
        this.minimapCamW = this.cam.width * this.minimapScale;
        this.minimapCamH = this.cam.height * this.minimapScale;

        this.minimapCamera = null;
    }

    updateMinimap() {
        this.minimapCamX = this.cam.worldView.x * this.minimapScale;
        this.minimapCamY = this.cam.worldView.y * this.minimapScale;
    }
}