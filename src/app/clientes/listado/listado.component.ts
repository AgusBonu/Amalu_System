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

  displayedColumns = ['idpersona'];
  data : any[];
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
  idpersona: number;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: number;
}
