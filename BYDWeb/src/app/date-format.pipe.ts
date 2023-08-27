import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, format: string = 'MMM D YYYY, h:mm:ss a'): string {
    return moment(value).format(format);
  }

}
