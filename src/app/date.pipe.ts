import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.getDay(value);
  }

  private getDay(id: string) {
    const intId = parseInt(id, 10);
    const year = 2012;
    return this.calcMonth(year, intId) + '/' + this.calcMonthDay(year, intId);
  }

  // month 1 - 12, month 0 : prev year, month 13 : next year
  private getLastDayOfMonth(year: number, month: number) {
    if (month === 0) {
      month = 12;
      year--;
    } else if (month === 13) {
      month = 1;
      year ++;
    } else if (month === 2) {
      if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        return 29;
      }
      return 28;
    }
    return 30 + (month + Math.floor(month / 8)) % 2;
  }

  // day >= 1 (must!), error ret 0
  private calcMonth(year: number, day: number) {
    if (day < 1) {
      return 0;
    }
    for (let i = 1; i <= 12; i++) {
      const days = this.getLastDayOfMonth(year, i);
      if (day <= days) {
        return i;
      }
      day -= days;
    }
    return 0;
  }

  // day >= 1 (must!), error ret 0
  private calcMonthDay(year: number, day: number) {
    if (day < 1) {
      return 0;
    }
    for (let i = 1; i <= 12; i++) {
      const days = this.getLastDayOfMonth(year, i);
      if (day <= days) {
        return day;
      }
      day -= days;
    }
    return 0;
  }

}
