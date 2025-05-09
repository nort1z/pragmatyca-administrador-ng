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
  on(ClienteActions.buscarClientePorRut, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ClienteActions.buscarClientePorRutSuccess, (state, { clientes }) => ({
    ...state,
    clientes,
    loading: false
  })),
  on(ClienteActions.buscarClientePorRutFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(ClienteActions.resetClienteState, state => ({
    ...initialState
  }))
);