import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-listadocategoria',
  templateUrl: './listadocategoria.component.html',
  styleUrls: ['listadocategoria.component.css']
})

export class ListadoCategoriaComponent implements OnInit {



  displayedColumns = ['accion', 'idcategoria', 'nombre','descripcion'];
  dataSource;

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
    let parametro = id;
    this.http.post<any>(
      'https://dab-development.com/webservice/ajax/control.php?op=eliminarcategoria',
       {parametro}
    ).subscribe(resp => {
      swal({
        title: "Exito!",
        text: "Categoria eliminada!",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        type: "success"
    }).catch(swal.noop);
      this.cargartabla();
    });
  }


  Actualizar(){
    $("#loadingListadoCategoria").show();
    $("#btnActualizarListado").prop( "disabled", true );
    this.cargartabla();
  }

  cargartabla(){
   
    this.http.post<any>(
      'https://dab-development.com/webservice/ajax/control.php?op=listarcategoria',
       {}
    ).subscribe(resp => {
      $("#btnActualizarListado").prop( "disabled", false );
      $("#loadingListadoCategoria").hide();
      this.dataSource = new MatTableDataSource<any[]>(resp.data);
      this.dataSource.paginator = this.paginator;
    });
  }


}
