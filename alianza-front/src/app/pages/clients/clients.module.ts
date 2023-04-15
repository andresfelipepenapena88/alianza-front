import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';

// Child Modules
import { ComponentsModule } from 'src/app/components/components.module';
import { ClientsComponent } from './clients.component';

// Redux
import { StoreModule } from '@ngrx/store';
import * as fromClientsReducer from './redux/clients.reducer';
import { ClientsService } from 'src/app/services/clients.service';
import { EffectsModule } from '@ngrx/effects';
import { ClientsEffects } from './redux/clients.effects';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    StoreModule.forFeature(fromClientsReducer.clientsReducerKey, fromClientsReducer.clientsReducer),
    EffectsModule.forFeature(ClientsEffects),
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [ ClientsComponent ],
  providers: [ ClientsService ]
})
export class ClientsModule { }
