import { collage } from './collage';
export interface studentDemand {
  Student_Demand_ID?: number;
  student_Demand_FirstName?: string;
  student_Demand_LastName?: string;
  Student_Demand_National_ID?: string;
  Student_Demand_Univercity_Number?: string;
  Collage_FK?: number;
  collage?: collage[];
}
