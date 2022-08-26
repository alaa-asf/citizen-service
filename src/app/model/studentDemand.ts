export interface studentDemand {
  student_Demand_ID?: number;
  student_Demand_FirstName?: string;
  student_Demand_LastName?: string;
  student_Demand_National_ID?: string;
  student_Demand_Univercity_Number?: string;
  collage_FK?: number;
  collage?: {
    collage_ID?: number;
    collage_Name?: string;
    is_Automated_Work?: true;
    execution_Period_Duration?: number;
  };
}
