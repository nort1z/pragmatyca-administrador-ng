import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClienteState } from './cliente.reducer';

export const selectClienteState = createFeatureSelector<ClienteState>('cliente');

export const selectClientes = createSelector(
  selectClienteState,
  (state: ClienteState) => state.clientes
);

export const selectClientesLoading = createSelector(
  selectClienteState,
  (state: ClienteState) => state.loading
);

export const selectClientesError = createSelector(
  selectClienteState,
  (state: ClienteState) => state.error
);