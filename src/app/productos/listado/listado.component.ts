import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

class DataTablesResponse {
  data: any[];
}

declare const $: any;

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['listado.component.css']
})

export class ListadoComponent implements OnInit {

  displayedColumns = ['idpersona', 'tipo_persona', 'nombre', 'tipo_documento', 'num_documento', 'direccion', 'telefono', 'email'];
  data : any[];
  dataSource;
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient) {}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  showNotification(from: any, align: any, mensaje, colour) {
    const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    const color = Math.floor((Math.random() * 6) + 1);

    $.notify({
        icon: 'notifications',
        message: mensaje
    }, {
        type: colour,
        timer: 1000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

  Urgente() {
    let envio : Array<number> = [];
    this.selection.selected.forEach(item => {
      envio.push(item.ID);
    });

    this.http.post<string>(
      'http://localhost/webservice/api/Extranet/InsertaListaUrgentes',
      envio, {}
    ).subscribe(resp => {
      if ( resp == '')
      {
        this.showNotification('top','right','Chasis actualizados','success');
      }
      else
      {
        this.showNotification('top','right','Error: ' + resp,'warning');
      }
      this.cargartabla();
      this.selection.clear();
    });
  }
   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit() {
    this.cargartabla();
  }

  cargartabla(){
   
    this.http.post<DataTablesResponse>(
      'http://localhost/webservice/ListarClientes.php',
       {}
    ).subscribe(resp => {
        this.data = resp.data;
        this.dataSource = new MatTableDataSource<Element>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }
}


export interface Element {
  ID: number;
  CHASSI: string;
  MODELO: string;
  MUNICIPIOCONCESSIONARIA: string;
  ESTADOCONCESSIONARIA: string;
  PATIO: string;
  CANAL: string;
  DIAS: number;
  LOTE: number;
  REMITO: number;
  NUMVIAGEMTMS: number;
  ENTREGADO: string;
}
