import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent {

  @Output()
  advancedSearch: EventEmitter<any> = new EventEmitter();

  search() {
    this.advancedSearch.emit(true);
  }

}
