import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'changeName'
})
export class changeNamePipe implements PipeTransform {
    transform(value: boolean): any {
        if (value == true)
            return "Yes";
        else if (value == false)
            return "No";
        else
            return value;
    }
}