export type EnemyType = "drone" | "dart" | "turret" | "lancer";
export type Formation = "line" | "vee" | "column" | "pincer";

export interface Wave {
  time: number;
  kind: EnemyType;
  count: number;
  formation: Formation;
  x?: number;
}

export interface Sector {
  title: string;
  subtitle: string;
  length: number;
  waves: Wave[];
}

export const Route: Sector[] = [
  {
    title: "Outer Drift",
    subtitle: "Scouts ahead",
    length: 1560,
    waves: [
      { time: 60, kind: "drone", count: 4, formation: "line" },
      { time: 360, kind: "drone", count: 5, formation: "vee", x: 168 },
      { time: 660, kind: "drone", count: 5, formation: "vee", x: 312 },
      { time: 960, kind: "drone", count: 6, formation: "line" },
      { time: 1200, kind: "drone", count: 4, formation: "column", x: 120 },
      { time: 1260, kind: "drone", count: 4, formation: "column", x: 360 },
    ],
  },
  {
    title: "Shatter Belt",
    subtitle: "Divers incoming",
    length: 1800,
    waves: [
      { time: 60, kind: "drone", count: 6, formation: "vee" },
      { time: 300, kind: "dart", count: 4, formation: "line" },
      { time: 600, kind: "dart", count: 5, formation: "column", x: 144 },
      { time: 720, kind: "dart", count: 5, formation: "column", x: 336 },
      { time: 1020, kind: "drone", count: 7, formation: "line" },
      { time: 1140, kind: "dart", count: 5, formation: "vee" },
      { time: 1440, kind: "dart", count: 6, formation: "line" },
    ],
  },
  {
    title: "Gun Lanes",
    subtitle: "Turrets online",
    length: 1920,
    waves: [
      { time: 60, kind: "turret", count: 1, formation: "line" },
      { time: 240, kind: "drone", count: 6, formation: "vee" },
      { time: 540, kind: "turret", count: 2, formation: "line" },
      { time: 840, kind: "dart", count: 6, formation: "column", x: 240 },
      { time: 1080, kind: "turret", count: 2, formation: "line" },
      { time: 1140, kind: "drone", count: 6, formation: "line" },
      { time: 1500, kind: "turret", count: 3, formation: "line" },
    ],
  },
  {
    title: "Lancer Gate",
    subtitle: "Crossfire",
    length: 1920,
    waves: [
      { time: 60, kind: "lancer", count: 4, formation: "pincer" },
      { time: 360, kind: "dart", count: 6, formation: "vee" },
      { time: 600, kind: "lancer", count: 6, formation: "pincer" },
      { time: 780, kind: "turret", count: 2, formation: "line" },
      { time: 1140, kind: "lancer", count: 6, formation: "pincer" },
      { time: 1260, kind: "drone", count: 8, formation: "vee" },
      { time: 1560, kind: "dart", count: 8, formation: "line" },
    ],
  },
  {
    title: "Last Approach",
    subtitle: "Everything they have",
    length: 2040,
    waves: [
      { time: 60, kind: "turret", count: 3, formation: "line" },
      { time: 180, kind: "lancer", count: 6, formation: "pincer" },
      { time: 540, kind: "dart", count: 6, formation: "column", x: 120 },
      { time: 540, kind: "dart", count: 6, formation: "column", x: 360 },
      { time: 900, kind: "drone", count: 9, formation: "vee" },
      { time: 1020, kind: "turret", count: 2, formation: "line" },
      { time: 1320, kind: "lancer", count: 8, formation: "pincer" },
      { time: 1560, kind: "dart", count: 8, formation: "vee" },
    ],
  },
  {
    title: "WARNING",
    subtitle: "The Warden approaches",
    length: 0,
    waves: [],
  },
];
