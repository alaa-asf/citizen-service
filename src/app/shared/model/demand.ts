import { collage } from './collage';
import { service } from './service';
import { studentDemand } from './studentDemand';
export interface demand {
  Demand_ID?: number;
  student_Demand_FK?: number;
  student_Demand?: studentDemand[];
  destination_Collage_FK?: number;
  destination_Collage?: collage[];
  service_FK?: number;
  service?: service[];
  demand_Date?: Date;
  demand_Barcode?: string;
  demand_Status?: string;
  User_Created_FK?: number;
  User_Created_Date?: Date;
  User_Finish_Demand_Note?: string;
  User_Finish_Demand_FK?: number;
  User_Finish_Demand_Date?: Date;
  Demand_Result?: string;
  demand_Applicant_Type?: string;
  agency_No?: string;
  agency_Date?: Date;
  agency_Source?: string;
  UUID?: string;
}