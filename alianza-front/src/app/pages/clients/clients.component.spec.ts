import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentsModule } from 'src/app/components/components.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ClientsComponent } from './clients.component';
import { ReactiveFormsModule } from '@angular/forms';
import { selectAddClient, selectGetClients } from './redux/clients.selectors';
import { ClientInfo } from 'src/app/models/client.model';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let store: MockStore;
  const initClientState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsComponent ],
      imports: [ RouterTestingModule, ComponentsModule, ReactiveFormsModule ],
      providers: [ 
        provideMockStore({
          initialState: initClientState,
          selectors: [{
              selector: selectGetClients,
              value: {
                getClients: {
                  loaded: true,
                  loading: false,
                  failed: false,
                  clients: []
                }
              }
            }, {
              selector: selectAddClient,
              value: {
                addClient: {
                  loaded: false,
                  loading: true,
                  failed: false
                }
              }
            }]
        }) 
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init clientsComponent', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should init clientsComponent select', () => {
    component.ngOnInit();
    store.select(selectGetClients).subscribe((response) => {
      expect(response).toEqual({
        getClients: {
          loaded: true,
          loading: false,
          failed: false,
          clients: []
        }
      });
    });
  });

  it('should excecute searchClient', () => {
    component.searchBySharedKey.setValue('apena');
    const event = null;
    const spy = spyOn(store, 'dispatch');
    component.searchClient(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should excecute sendClientForm when add is true', () => {
    const client: ClientInfo =  {
      name: '',
      phone: '',
      email: '',
      startDate: '',
      endDate: '',
    }
    const mockEvent = { add: true, client };
    const spy = spyOn(store, 'dispatch');
    component.sendClientForm(mockEvent);
    expect(spy).toHaveBeenCalled();
    store.select(selectAddClient).subscribe((response) => {
      expect(response).toEqual({
        addClient: {
          loaded: false,
          loading: true,
          failed: false
        }
      });
    })
  });

  it('should excecute sendClientForm when add is false', () => {
    const client: ClientInfo =  {
      name: '',
      phone: '',
      email: '',
      startDate: '',
      endDate: '',
    }
    const mockEvent = { add: false, client };
    const spy = spyOn(store, 'dispatch');
    component.sendClientForm(mockEvent);
    expect(spy).toHaveBeenCalled();
  });
});
