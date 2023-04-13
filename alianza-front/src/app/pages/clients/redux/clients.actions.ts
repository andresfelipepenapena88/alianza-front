import { createAction, props } from "@ngrx/store";

export enum ClientsActionsTypes {
    GET_ALL_CLIENTS = "[GET_ALL_CLIENTS] Get all clients",
    GET_ALL_CLIENTS_SUCCESS = "[GET_ALL_CLIENTS] Get all clients success",
    GET_ALL_CLIENTS_FAILED = "[GET_ALL_CLIENTS] Get all clients failed"
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