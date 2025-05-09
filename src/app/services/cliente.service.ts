import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  /**
   * Busca clientes por RUT
   * @param rut Número de RUT a buscar
   * @returns Observable con arreglo de clientes que coinciden con el RUT
   */
  buscarPorRut(rut: string): Observable<Cliente[]> {
    const params = new HttpParams().set('rut', rut);
    return this.http.get<Cliente[]>(`${this.apiUrl}/buscar`, { params });
  }
}