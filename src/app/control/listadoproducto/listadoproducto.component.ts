import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {  MatPaginator, MatTableDataSource } from '@angular/material';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-listadoproducto',
  templateUrl: './listadoproducto.component.html',
  styleUrls: ['listadoproducto.component.css']
})

export class ListadoComponent implements OnInit {



  displayedColumns = ['accion', 'idarticulo', 'idcategoria','nombre', 'stock', 'descripcion', 'imagen', 'precio', 'condicion', 'talle'];
  dataSource;
  imgPath = "https:\\www.dab-development.com/assets/img/";
  register : FormGroup;
  nombre: string;
  cantidad: string;
  descripcion: string;
  precio: string;
  talle: string;
  idarticulo: number;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
 
    this.cargartabla();
    this.register = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      cantidad: [null, Validators.required],
      precio: [null, Validators.required],
      talle: [null, Validators.required],
    });
  }


editar(id: number){
  let parametro = id;
  this.http.post<any>(
    'https://dab-development.com/webservice/ajax/control.php?op=listarproductodetalle',
     {parametro}
  ).subscribe(resp => {
    this.idarticulo = resp.data[0].idarticulo;
    this.nombre = resp.data[0].nombre;
    this.cantidad = resp.data[0].cantidad;
    this.descripcion = resp.data[0].descripcion;
    this.precio = resp.data[0].precio;
    this.talle = resp.data[0].talle;
  });
}

  eliminar(id: number)
  {
    swal({
      title: 'Esta seguro?',
      text: 'Este proceso eliminara su pructo del sistema',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false
  }).then((result) => {
    if (result.value) {
      let parametro = id;
      this.http.post<any>(
        'https://dab-development.com/webservice/ajax/control.php?op=eliminarproducto',
        {parametro}
      ).subscribe(resp => {
        swal({
          title: 'Exito!',
          text: 'Producto eliminado!',
          type: 'success',
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false
      }).catch(swal.noop);
        this.cargartabla();
      });
    } else {
      swal({
          title: 'Cancelado!',
          text: 'Ningun cambio realizado',
          type: 'error',
          confirmButtonClass: "btn btn-info",
          buttonsStyling: false
      }).catch(swal.noop)
    }
  })
  }

  onRegister(){
    
  }
  // convenience getter for easy access to form fields
  get f() { return this.register.controls; }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }


  Actualizar(){
    $("#loadingListadoProducto").show();
    $("#btnActualizarListado").prop( "disabled", true );
    this.cargartabla();
  }

  cargartabla(){
    this.http.post<any>(
      'https://dab-development.com/webservice/ajax/control.php?op=listarproducto',
       {}
    ).subscribe(resp => {
      $("#btnActualizarListado").prop( "disabled", false );
      $("#loadingListadoProducto").hide();
      this.dataSource = new MatTableDataSource<any[]>(resp.data);
      this.dataSource.paginator = this.paginator;
    });
  }
  


}
