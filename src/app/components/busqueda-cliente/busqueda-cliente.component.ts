import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/cliente.model';
import * as ClienteActions from '../../store/cliente.actions';
import * as ClienteSelectors from '../../store/cliente.selectors';

@Component({
  selector: 'app-busqueda-cliente',
  templateUrl: './busqueda-cliente.component.html',
  styleUrls: ['./busqueda-cliente.component.scss']
})
export class BusquedaClienteComponent implements OnInit {
  formBusqueda: FormGroup;
  clientes$: Observable<Cliente[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  
  displayedColumns: string[] = ['id', 'rut', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'email'];

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.formBusqueda = this.fb.group({
      rut: ['', [Validators.required, Validators.minLength(1)]]
    });
    
    this.clientes$ = this.store.select(ClienteSelectors.selectClientes);
    this.loading$ = this.store.select(ClienteSelectors.selectClientesLoading);
    this.error$ = this.store.select(ClienteSelectors.selectClientesError);
  }

  ngOnInit(): void {
    // Inicialización adicional si es necesaria
  }

  buscarCliente(): void {
    if (this.formBusqueda.valid) {
      const rut = this.formBusqueda.get('rut')?.value;
      this.store.dispatch(ClienteActions.buscarClientePorRut({ rut }));
    }
  }

  limpiarResultados(): void {
    this.store.dispatch(ClienteActions.resetClienteState());
    this.formBusqueda.reset();
  }
}