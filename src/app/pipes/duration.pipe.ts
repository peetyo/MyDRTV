import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    // Transforming min to h and min
    const numberToTransform = value;
    const hours = (numberToTransform / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    if(numberToTransform % 60 == 0){
      return rhours + "h";
    }
    else if( rhours != 0){
      return rhours + "h " + rminutes + "min";
    }else{
      return rminutes + "min";
    }
  }

}