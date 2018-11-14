import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {  MatPaginator, MatTableDataSource } from '@angular/material';
import swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-listadoproducto',
  templateUrl: './listadoproducto.component.html',
  styleUrls: ['listadoproducto.component.css']
})

export class ListadoComponent implements OnInit {



  displayedColumns = ['accion', 'idarticulo', 'idcategoria','nombre', 'stock', 'descripcion', 'imagen', 'precio', 'condicion'];
  dataSource;
  imgPath = "https:\\www.dab-development.com/assets/img/";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient) {}


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
 
    this.cargartabla();
  }

  eliminar(id: number)
  {
    //console.log(id);
    let parametro = id;
    this.http.post<any>(
      'https://dab-development.com/webservice/ajax/control.php?op=eliminarproducto',
       {parametro}
    ).subscribe(resp => {
      swal({
        title: "Exito!",
        text: "Producto eliminado!",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        type: "success"
    }).catch(swal.noop);
      this.cargartabla();
    });
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
