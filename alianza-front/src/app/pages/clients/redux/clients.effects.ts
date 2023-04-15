import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
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
            }),
            catchError(() => of({ type: fromClientsActions.ClientsActionsTypes.GET_ALL_CLIENTS_FAILED }))
        ))
    ));

    getClientsBySharedKey$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientsActions.ClientsActionsTypes.GET_CLIENTS_BY_SHARED_KEY),
        switchMap((payload: { sharedKey: string }) => this.clientsService.getClientsBySharedKey(payload.sharedKey).pipe(
            map((response: ClientInfo[]) => {
                if (response) {
                    return fromClientsActions.getClientsBySharedKeySuccess({ clients: response });
                } else {
                    return fromClientsActions.getClientsBySharedKeyFailed();
                }
            }),
            catchError(() => of({ type: fromClientsActions.ClientsActionsTypes.GET_CLIENTS_BY_SHARED_KEY_FAILED }))
        ))
    ));

    addClient$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientsActions.ClientsActionsTypes.ADD_CLIENT),
        switchMap((payload: { client: ClientInfo }) => this.clientsService.addClient(payload.client).pipe(
            map((response: number) => {
                if (response) {
                    return fromClientsActions.addClientSuccess();
                } else {
                    return fromClientsActions.addClientFailed();
                }
            }),
            catchError(() => of({ type: fromClientsActions.ClientsActionsTypes.ADD_CLIENT_FAILED }))
        ))
    ));

    addClientSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientsActions.ClientsActionsTypes.ADD_CLIENT_SUCCESS),
        map(() => fromClientsActions.getAllClients())
    ));

    getClientsByAdvancedSearch$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientsActions.ClientsActionsTypes.GET_CLIENTS_BY_ADVANCED_SEARCH),
        switchMap((payload: { client: ClientInfo }) => this.clientsService.getClientsByAdvancedSearch(payload.client).pipe(
            map((response: ClientInfo[]) => {
                if (response) {
                    return fromClientsActions.getAllClientsSuccess({ clients: response });
                } else {
                    return fromClientsActions.getAllClientsFailed();
                }
            }),
            catchError(() => of({ type: fromClientsActions.ClientsActionsTypes.GET_ALL_CLIENTS_FAILED }))
        ))
    ));

    constructor(
        private actions$: Actions,
        private clientsService: ClientsService
    ) {}
}