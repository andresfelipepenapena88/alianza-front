import { on, createReducer } from '@ngrx/store';
import * as fromClientsActions from './clients.actions';

export interface ClientsState {
    getClients: {
        loaded: boolean;
        loading: boolean;
        failed: boolean;
        clients: any[]
    };
    addClient: {
        loaded: boolean;
        loading: boolean;
        failed: boolean;
    };
}

export const initClientsState: ClientsState = {
    getClients: {
        loaded: false,
        loading: false,
        failed: false,
        clients: []
    },
    addClient: {
        loaded: false,
        loading: false,
        failed: false
    }
}

export const clientsReducer = createReducer(
    initClientsState,
    on(
        fromClientsActions.getAllClients,
        state => ({
            ...state,
            getClients: {
                loaded: false,
                loading: true,
                failed: false,
                clients: state.getClients.clients
            }
        })
    ),
    on(
        fromClientsActions.getAllClientsSuccess,
        (state, payload) => ({
            ...state,
            getClients: {
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
            getClients: {
                loaded: false,
                loading: false,
                failed: true,
                clients: []
            }
        })
    ),
    on(
        fromClientsActions.getClientsBySharedKey,
        state => ({
            ...state,
            getClients: {
                loaded: false,
                loading: true,
                failed: false,
                clients: state.getClients.clients
            }
        })
    ),
    on(
        fromClientsActions.getClientsBySharedKeySuccess,
        (state, payload) => ({
            ...state,
            getClients: {
                loaded: true,
                loading: false,
                failed: false,
                clients: payload.clients
            }
        })
    ),
    on(
        fromClientsActions.getClientsBySharedKeyFailed,
        state => ({
            ...state,
            getClients: {
                loaded: false,
                loading: false,
                failed: true,
                clients: state.getClients.clients
            }
        })
    ),
    on(
        fromClientsActions.addClient,
        state => ({
            ...state,
            addClient: {
                loaded: false,
                loading: true,
                failed: false
            }
        })
    ),
    on(
        fromClientsActions.addClientSuccess,
        state => ({
            ...state,
            addClient: {
                loaded: true,
                loading: false,
                failed: false
            }
        })
    ),
    on(
        fromClientsActions.addClientFailed,
        state => ({
            ...state,
            addClient: {
                loaded: false,
                loading: true,
                failed: false
            }
        })
    ),
    on(
        fromClientsActions.getClientsByAdvancedSearch,
        state => ({
            ...state,
            getClients: {
                loaded: false,
                loading: true,
                failed: false,
                clients: state.getClients.clients
            }
        })
    ),
);

export const clientsReducerKey = 'clients';