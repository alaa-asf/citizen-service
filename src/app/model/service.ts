import { DocumentRequired } from "./documentRequired";

export interface service {
  service_ID?: number;
  service_Name?: string;
  service_Document_Required?: DocumentRequired[];
}
