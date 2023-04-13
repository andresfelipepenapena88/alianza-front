import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientLookHistoryComponent } from './pages/client-look-history/client-look-history.component';

const routes: Routes = [
  { 
    path: 'home', component: HomeComponent,
    children: [
      { path: 'clients', component: ClientsComponent },
      { path: 'client-history', component: ClientLookHistoryComponent },
      { path: '**', redirectTo: '/clients', pathMatch: 'full'}
    ]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
