export interface service {
  service_ID?: number;
  service_Name?: string;
  service_Document_Required?: [
    {
      document_Required_Service_ID?: number;
      service_FK?: number;
      document_Required_Service_Name?: string;
    }
  ];
}
