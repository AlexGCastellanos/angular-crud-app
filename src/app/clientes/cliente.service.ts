import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {

  private urlEndPoint: string = 'https://spring-boot-backend-apirest.herokuapp.com/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient,
    private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        
        if(e.status==400){
          return throwError(() => e);
        }

        console.error(e.error.mensaje),
        Swal.fire({
          title: e.error.mensaje,
          text: e.error.error,
          icon: 'error',
          confirmButtonColor: '#0865EC'
        })
        return throwError(() => new Error(e));
      })
    );
  }

  getClienteById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire({
          title: e.error.mensaje,
          text: e.error.error,
          icon: 'error',
          confirmButtonColor: '#0865EC'
        })
        return throwError(() => new Error(e));
      })
     );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        
        if(e.status==400){
          return throwError(() => e);
        }

        console.error(e.error.mensaje),
        Swal.fire({
          title: e.error.mensaje,
          text: e.error.error,
          icon: 'error',
          confirmButtonColor: '#0865EC'
        })
        return throwError(() => new Error(e));
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje),
        Swal.fire({
          title: e.error.mensaje,
          text: e.error.error,
          icon: 'error',
          confirmButtonColor: '#0865EC'
        })
        return throwError(() => new Error(e));
      })
    );
  }

}
