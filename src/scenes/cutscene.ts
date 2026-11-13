import Phaser from "phaser";
import { HEIGHT, WIDTH } from "../actors.ts";
import type { Hud } from "../hud.ts";
import { Backdrop } from "./backdrop.ts";

interface RunStats {
  score: number;
  lives: number;
  kills: number;
  hits: number;
  continues: number;
  bossDefeated: boolean;
}

interface CutsceneData {
  run: RunStats;
  afterDemo: boolean;
}

export class CutsceneScene extends Phaser.Scene {
  private backdrop!: Backdrop;
  private run!: RunStats;
  private afterDemo = false;
  private leaving = false;

  constructor(private readonly hud: Hud) {
    super("cutscene");
  }

  init(data: CutsceneData): void {
    this.run = data.run;
    this.afterDemo = data.afterDemo ?? false;
    this.leaving = false;
  }

  create(): void {
    this.backdrop = new Backdrop(this);

    this.hud.setMode("cutscene");
    this.hud.setBoss(null);
    this.hud.say("");

    this.cameras.main.fadeIn(600, 4, 2, 12);

    const heading = this.add.text(
      WIDTH / 2,
      HEIGHT * 0.22,
      "THE LANES ARE OPEN",
      {
        fontFamily: "Orbitron, Trebuchet MS, sans-serif",
        fontSize: "26px",
        fontStyle: "bold",
        color: "#e8fdff",
        align: "center",
      },
    ).setOrigin(0.5);

    heading.enableFilters();
    heading.filters?.internal.addGlow(
      0x5ef2ff,
      5,
      0,
      1,
    );

    this.add.text(
      WIDTH / 2,
      HEIGHT * 0.34,
      "The Warden has fallen.\nThe convoy can pass.",
      {
        fontFamily: "monospace",
        fontSize: "17px",
        color: "#b6d6ef",
        align: "center",
        lineSpacing: 10,
      },
    ).setOrigin(0.5);

    const stats = [
      `SCORE       ${this.run.score}`,
      `KILLS       ${this.run.kills}`,
      `HITS        ${this.run.hits}`,
      `CONTINUES   ${this.run.continues}`,
    ].join("\n");

    this.add.text(
      WIDTH / 2,
      HEIGHT * 0.55,
      stats,
      {
        fontFamily: "monospace",
        fontSize: "18px",
        color: "#ffe066",
        align: "left",
        lineSpacing: 10,
      },
    ).setOrigin(0.5);

    this.add.text(
      WIDTH / 2,
      HEIGHT * 0.82,
      "SPACE  return to title",
      {
        fontFamily: "monospace",
        fontSize: "15px",
        color: "#8aa4c8",
      },
    ).setOrigin(0.5);

    this.input.keyboard?.on(
      "keydown-SPACE",
      this.returnToTitle,
      this,
    );

    this.events.once(
      Phaser.Scenes.Events.SHUTDOWN,
      () => {
        this.input.keyboard?.off(
          "keydown-SPACE",
          this.returnToTitle,
          this,
        );
      },
    );

    // Automatically return to the title after the demo.
    if (this.afterDemo) {
      this.time.delayedCall(
        8000,
        this.returnToTitle,
        [],
        this,
      );
    }
  }

  override update(
    _time: number,
    delta: number,
  ): void {
    this.backdrop.scroll(delta);
  }

  private returnToTitle(): void {
    if (this.leaving) return;

    this.leaving = true;

    this.cameras.main.fadeOut(
      450,
      4,
      2,
      12,
    );

    this.cameras.main.once(
      "camerafadeoutcomplete",
      () => {
        this.scene.start("title");
      },
    );
  }
}
