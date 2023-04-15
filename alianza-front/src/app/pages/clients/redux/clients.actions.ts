import { createAction, props } from "@ngrx/store";
import { ClientInfo } from "src/app/models/client.model";

export enum ClientsActionsTypes {
    GET_ALL_CLIENTS = "[CLIENTS] Get all clients",
    GET_ALL_CLIENTS_SUCCESS = "[CLIENTS] Get all clients success",
    GET_ALL_CLIENTS_FAILED = "[CLIENTS] Get all clients failed",
    GET_CLIENTS_BY_SHARED_KEY = "[CLIENTS] Get clients by sharedkey",
    GET_CLIENTS_BY_SHARED_KEY_SUCCESS = "[CLIENTS] Get clients by sharedkey success",
    GET_CLIENTS_BY_SHARED_KEY_FAILED = "[CLIENTS] Get clients by sharedkey failed",
    ADD_CLIENT = "[CLIENTS] Add client",
    ADD_CLIENT_SUCCESS = "[CLIENTS] Add client success",
    ADD_CLIENT_FAILED = "[CLIENTS] Add client failed",
    GET_CLIENTS_BY_ADVANCED_SEARCH = "[CLIENTS] Get clients by advanced search"
}

export const getAllClients = createAction(
    ClientsActionsTypes.GET_ALL_CLIENTS
);

export const getAllClientsSuccess = createAction(
    ClientsActionsTypes.GET_ALL_CLIENTS_SUCCESS,
    props<{ clients: any[] }>()
);

export const getAllClientsFailed = createAction(
    ClientsActionsTypes.GET_ALL_CLIENTS_FAILED
);

export const getClientsBySharedKey = createAction(
    ClientsActionsTypes.GET_CLIENTS_BY_SHARED_KEY,
    props<{ sharedKey: string }>()
);

export const getClientsBySharedKeySuccess = createAction(
    ClientsActionsTypes.GET_CLIENTS_BY_SHARED_KEY_SUCCESS,
    props<{ clients: any[] }>()
);

export const getClientsBySharedKeyFailed = createAction(
    ClientsActionsTypes.GET_CLIENTS_BY_SHARED_KEY_FAILED
);

export const addClient = createAction(
    ClientsActionsTypes.ADD_CLIENT,
    props<{ client: ClientInfo }>()
);

export const addClientSuccess = createAction(
    ClientsActionsTypes.ADD_CLIENT_SUCCESS
);

export const addClientFailed = createAction(
    ClientsActionsTypes.ADD_CLIENT_FAILED
);

export const getClientsByAdvancedSearch = createAction(
    ClientsActionsTypes.GET_CLIENTS_BY_ADVANCED_SEARCH,
    props<{ client: ClientInfo }>()
);