import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();

  public titulo: string = 'Crear Cliente';

  public errores: string[];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { };

  ngOnInit(): void {
    this.uploadCliente();
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe({
      next: cliente => {
        console.log('Entré al next dentro del suscribe');
        this.router.navigate(['/clientes'])
        Swal.fire({
          title: 'Nuevo cliente',
          text: `El cliente ${cliente.nombre} ha sido creado con exito`,
          icon: 'success',
          confirmButtonText: 'Cool',
          confirmButtonColor: '#0865EC'
        })
      },

      error: err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend' + err.status);
        console.error(err.error.errors);
      }
    });
    console.log("Clicked!");
    console.log(this.cliente);
  }

  public uploadCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getClienteById(id).subscribe(cliente => this.cliente = cliente)
      }
    })
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe({
      next: json => {
        this.router.navigate(['/clientes'])
        Swal.fire({
          title: 'Cliente Actualizado',
          text: `${json.mensaje}: ${json.cliente.nombre}`,
          icon: 'success',
          confirmButtonText: 'Cool',
          confirmButtonColor: '#0865EC'
        })
      },

      error: err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend' + err.status);
        console.error(err.error.errors);
      }

    })
  }

}
