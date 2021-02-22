import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "filter"
})

export class FilterPipe implements PipeTransform {

    constructor() { }
    transform(value: any, args?: any) {

        if (args === '') {
            return value
        }
        return value.filter((val: any) => val.Type.toLowerCase() === args);
    }
}