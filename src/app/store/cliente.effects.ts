import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ClienteService } from '../services/cliente.service';
import * as ClienteActions from './cliente.actions';

@Injectable()
export class ClienteEffects {
  buscarClientePorRut$ = createEffect(() => this.actions$.pipe(
    ofType(ClienteActions.buscarClientePorRut),
    mergeMap(action => 
      this.clienteService.buscarPorRut(action.rut).pipe(
        map(clientes => ClienteActions.buscarClientePorRutSuccess({ clientes })),
        catchError(error => of(ClienteActions.buscarClientePorRutFailure({ 
          error: error.message || 'Error al buscar el cliente' 
        })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private clienteService: ClienteService
  ) {}
}