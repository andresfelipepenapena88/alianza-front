import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import * as fromClientsActions from './clients.actions';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientInfo } from 'src/app/models/client.model';

@Injectable()
export class ClientsEffects {
    
    getAllClients$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientsActions.ClientsActionsTypes.GET_ALL_CLIENTS),
        switchMap(() => this.clientsService.getAllClients().pipe(
            map((response: ClientInfo[]) => {
                if (response) {
                    return fromClientsActions.getAllClientsSuccess({ clients: response });
                } else {
                    return fromClientsActions.getAllClientsFailed();
                }
            })
        ))
    ));

    constructor(
        private actions$: Actions,
        private clientsService: ClientsService
    ) {}
}