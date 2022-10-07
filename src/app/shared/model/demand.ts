import { collage } from './collage';
import { service } from './service';
import { studentDemand } from './studentDemand';
export interface demand {
  demand_ID?: number;
  student_Demand_FK?: number;
  student_Demand?: studentDemand[];
  destination_Collage_FK?: number;
  destination_Collage?: collage[];
  service_FK?: number;
  service?: service[];
  demand_Date?: Date;
  demand_Barcode?: string;
  demand_Status?: string;
  user_Created_FK?: number;
  user_Created_Date?: Date;
  user_Finish_Demand_Note?: string;
  user_Finish_Demand_FK?: number;
  user_Finish_Demand_Date?: Date;
  demand_Result?: string;
  demand_Applicant_Type?: string;
  agency_No?: string;
  agency_Date?: Date;
  agency_Source?: string;
  UUID?: string;
}