import { collage } from './collage';
import { demand } from './demand';
export interface collageRecord {
  collage_Records_ID?: number;
  demand_FK?: number;
  collage_FK?: number;
  type?: string;
  diwan_NO?: string;
  diwan_Date?: Date;
  reporter_Name?: string;
  demand?: demand[];
  collage?: collage[];
}
