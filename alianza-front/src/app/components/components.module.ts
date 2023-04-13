import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';



@NgModule({
  declarations: [
    AdvancedSearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdvancedSearchComponent
  ]
})
export class ComponentsModule { }
