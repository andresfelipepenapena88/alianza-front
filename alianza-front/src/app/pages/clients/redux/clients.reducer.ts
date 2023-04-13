import { on, createReducer } from '@ngrx/store';
import * as fromClientsActions from './clients.actions';

export interface ClientsState {
    getAllClients: {
        loaded: boolean;
        loading: boolean;
        failed: boolean;
        clients: any[]
    };
}

export const initClientsState: ClientsState = {
    getAllClients: {
        loaded: false,
        loading: false,
        failed: false,
        clients: []
    }
}

export const clientsReducer = createReducer(
    initClientsState,
    on(
        fromClientsActions.getAllClients,
        state => ({
            ...state,
            getAllClients: {
                loaded: false,
                loading: true,
                failed: false,
                clients: state.getAllClients.clients
            }
        })
    ),
    on(
        fromClientsActions.getAllClientsSuccess,
        (state, payload) => ({
            ...state,
            getAllClients: {
                loaded: true,
                loading: false,
                failed: false,
                clients: payload.clients
            }
        })
    ),
    on(
        fromClientsActions.getAllClientsFailed,
        state => ({
            ...state,
            getAllClients: {
                loaded: false,
                loading: false,
                failed: true,
                clients: []
            }
        })
    )
);

export const clientsReducerKey = 'clients';