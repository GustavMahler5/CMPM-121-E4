import Phaser from "phaser";
import { makeTextures } from "../textures.ts";
import { loadSounds } from "../sounds.ts";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  create(): void {
    // Initialize game textures and sounds once.
    if (!this.textures.exists("player")) {
      makeTextures(this);
      loadSounds(this);
    }

    // Start the title screen after initialization.
    this.scene.start("title");
  }
}
