import { ExperienceItem } from "../../data/experiences";

export type ItemRow = {
  type: "item";
  item: ExperienceItem;
  top: number;
  durationHeight: number;
  segmentTop: number;
  startLabelTop: number;
  rowHeight: number;
  isLeft: boolean;
  laneOffset: number;
};

export type TimelineRow = ItemRow;
