import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromClientsReducer from './clients.reducer';

export const clientsSelector = createFeatureSelector<fromClientsReducer.ClientsState>(fromClientsReducer.clientsReducerKey);

export const selectGetAllClients = createSelector(
    clientsSelector,
    (state: fromClientsReducer.ClientsState) => state.getAllClients
)