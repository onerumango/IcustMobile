import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from './currency.pipe';
import { SearchFilterPipe } from './search-filter.pipe';

@NgModule({
  declarations: [CurrencyPipe,SearchFilterPipe],
  exports: [
    CurrencyPipe,
    SearchFilterPipe
  ],
  imports: [
    CommonModule
  ],
})
export class PipesModule {
}
