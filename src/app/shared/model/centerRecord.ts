import { collage } from "./collage";
import { demand } from "./demand";

export interface centerRecord {
  center_Record_ID?: number;
  Demand_FK?: number;
  collage_FK?: number;
  type?: string;
  diwan_NO?: string;
  diwan_Date?: Date;
  reporter_Name?: string;
  Demand?: demand[];
  collage?: collage[];
}
