import { collage } from './collage';
export interface studentDemand {
  student_Demand_ID?: number;
  student_Demand_FirstName?: string;
  student_Demand_LastName?: string;
  student_Demand_National_ID?: string;
  student_Demand_Univercity_Number?: string;
  collage_FK?: number;
  collage?: collage[];
}
