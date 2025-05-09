import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// PrimeNG
import { TableModule } from 'primeng/table';

// Models & Store
import { Cliente } from '../../models/cliente.model';
import * as ClienteActions from '../../store/cliente.actions';
import * as ClienteSelectors from '../../store/cliente.selectors';

@Component({
  selector: 'app-busqueda-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TableModule
  ],
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