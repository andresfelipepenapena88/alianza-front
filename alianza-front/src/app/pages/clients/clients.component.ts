import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromClientsActions from './redux/clients.actions';
import * as fromClientsReducer from './redux/clients.reducer';
import * as fromClientsSelectors from './redux/clients.selectors';
import { Subscription } from 'rxjs';
import { ClientInfo } from 'src/app/models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {
  unsubscribe: Subscription[] = [];
  showAdvancedSearchComponent = false;
  clientsInfo: ClientInfo[] = [];
  clientsTableSpinner = false;

  constructor(
    private clientsStore: Store<fromClientsReducer.ClientsState>
  ) {}

  ngOnInit(): void {
    this.clientsStore.dispatch(fromClientsActions.getAllClients());
    this.unsubscribe.push(
      this.clientsStore.select(fromClientsSelectors.selectGetAllClients).subscribe((response) => {
        this.clientsTableSpinner = response.loading;
        if (response.loaded) {
          this.clientsInfo = response.clients;
        }
      })
    );
  }

  advancedSearch(event: any) {
    this.showAdvancedSearchComponent = !event;
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(subscription => subscription.unsubscribe());
  }
  
}
