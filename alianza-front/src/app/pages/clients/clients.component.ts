import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromClientsActions from './redux/clients.actions';
import * as fromClientsReducer from './redux/clients.reducer';
import * as fromClientsSelectors from './redux/clients.selectors';
import { Subscription } from 'rxjs';
import { ClientInfo } from 'src/app/models/client.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

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
  searchBySharedKey: FormControl = new FormControl('');

  @ViewChild('addClientModal') addClientModal!: ElementRef;
  constructor(
    private clientsStore: Store<fromClientsReducer.ClientsState>
  ) {}

  ngOnInit(): void {
    this.clientsStore.dispatch(fromClientsActions.getAllClients());
    this.unsubscribe.push(
      this.clientsStore.select(fromClientsSelectors.selectGetClients).subscribe((response) => {
        this.clientsTableSpinner = response.loading;
        if (response.loaded) {
          this.clientsInfo = response.clients;
        }
      })
    );
  }

  searchClient(event: any) {
    const sharedKey = this.searchBySharedKey.value;
    if (sharedKey != null) {
      this.clientsStore.dispatch(fromClientsActions.getClientsBySharedKey({ sharedKey }));
    } 
  }

  sendClientForm(event: { add: boolean; client: ClientInfo }) {
    if (event.add) {
      this.clientsStore.dispatch(fromClientsActions.addClient({ client: event.client }));
      this.unsubscribe.push(
        this.clientsStore.select(fromClientsSelectors.selectAddClient).subscribe(response => {
          this.clientsTableSpinner = response.loading;
          if (response.loaded) {
            Swal.fire({
              icon: 'success',
              toast: true,
              position: 'top-end',
              title: 'Client creation success!',
              showConfirmButton: false,
              timer: 3000
            });
          }
          this.addClientModal!.nativeElement.click();
        })
      );
    } else {
      this.clientsStore.dispatch(fromClientsActions.getClientsByAdvancedSearch({ client: event.client }));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(subscription => subscription.unsubscribe());
  }
  
}
