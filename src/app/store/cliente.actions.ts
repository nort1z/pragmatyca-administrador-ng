import { createAction, props } from '@ngrx/store';
import { Cliente } from '../models/cliente.model';

export const buscarClientePorRut = createAction(
  '[Cliente] Buscar Cliente Por Rut',
  props<{ rut: string }>()
);

export const buscarClientePorRutSuccess = createAction(
  '[Cliente] Buscar Cliente Por Rut Success',
  props<{ clientes: Cliente[] }>()
);

export const buscarClientePorRutFailure = createAction(
  '[Cliente] Buscar Cliente Por Rut Failure',
  props<{ error: string }>()
);

export const resetClienteState = createAction(
  '[Cliente] Reset Estado'
);