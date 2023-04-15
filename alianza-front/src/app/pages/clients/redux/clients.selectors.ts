import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromClientsReducer from './clients.reducer';

export const clientsSelector = createFeatureSelector<fromClientsReducer.ClientsState>(fromClientsReducer.clientsReducerKey);

export const selectGetClients = createSelector(
    clientsSelector,
    (state: fromClientsReducer.ClientsState) => state.getClients
)

export const selectAddClient = createSelector(
    clientsSelector,
    (state: fromClientsReducer.ClientsState) => state.addClient
)