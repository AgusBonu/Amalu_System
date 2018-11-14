import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

class DataTablesResponse {
  data: any[];
}

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['listado.component.css']
})

export class ListadoComponent implements OnInit {

  displayedColumns = ['idpersona', 'tipo_persona' , 'nombre', 'tipo_documento', 'num_documento', 'direccion', 'telefono', 'email'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
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

  cargartabla(){
   
    this.http.post<DataTablesResponse>(
      'https://dab-development.com/webservice/ajax/control.php?op=listar',
       {}
    ).subscribe(resp => {
      if (resp != null)
      {
        this.dataSource = new MatTableDataSource<Element>(resp.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
}
