import { Pipe, PipeTransform } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';

@Pipe({
  name: 'currencySymbol'
})
export class CurrencyPipe implements PipeTransform {

  transform(
    code: string,
    format: 'wide' | 'narrow' = 'narrow',
    locale?: string
  ): any {
    return getCurrencySymbol(code, format, locale);
  }
}
