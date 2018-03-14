import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(p_seconds: string): string {
    const sec:number = parseInt(p_seconds);
    let minutes:number = Math.floor(sec / 60);
    let seconds:number = sec - ( minutes * 60 );

    if(seconds < 10){
      
    return minutes+":"+ 0 +seconds;

    } else {

      return minutes+":"+seconds;
    }
  }

}
