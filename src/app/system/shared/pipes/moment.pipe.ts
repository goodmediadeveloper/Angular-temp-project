import {Pipe, PipeTransform} from "@angular/core";
import * as moment from 'moment/moment';

@Pipe({
  name: 'wfMoment'
})

export class MomentPipe implements PipeTransform{
  transform(value: string, formatFrom: string, formatTo: string = 'DD.MM.YYYY'): any {
    return moment(value, formatFrom).format(formatTo);
  }

}
