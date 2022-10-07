import { collage } from "./collage";

export interface postalReporter {
    PostalReporter_ID?: number;
    PostalReporter_Name?: string;
    Collage_FK?: number;
    Collage?: collage[];
}