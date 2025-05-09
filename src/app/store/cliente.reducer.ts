import { createReducer, on } from '@ngrx/store';
import { Cliente } from '../models/cliente.model';
import * as ClienteActions from './cliente.actions';

export interface ClienteState {
  clientes: Cliente[];
  loading: boolean;
  error: string | null;
}

export const initialState: ClienteState = {
  clientes: [],
  loading: false,
  error: null
};

export const clienteReducer = createReducer(
  initialState,
  on(ClienteActions.buscarClientePorRut, (state: ClienteState) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ClienteActions.buscarClientePorRutSuccess, (state: ClienteState, { clientes }: { clientes: Cliente[] }) => ({
    ...state,
    clientes,
    loading: false
  })),
  on(ClienteActions.buscarClientePorRutFailure, (state: ClienteState, { error }: { error: string }) => ({
    ...state,
    error,
    loading: false
  })),
  on(ClienteActions.resetClienteState, (state: ClienteState) => ({
    ...initialState
  }))
);