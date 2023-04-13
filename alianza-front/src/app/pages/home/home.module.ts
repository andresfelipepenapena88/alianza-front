import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ClientsModule } from '../clients/clients.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClientLookHistoryModule } from '../client-look-history/client-look-history.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ClientsModule,
    ClientLookHistoryModule
  ]
})
export class HomeModule { }
