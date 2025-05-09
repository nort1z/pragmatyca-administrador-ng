import { Routes } from '@angular/router';
import { BusquedaClienteComponent } from './components/busqueda-cliente/busqueda-cliente.component';

export const routes: Routes = [
  { path: '', component: BusquedaClienteComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];