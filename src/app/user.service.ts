import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  message: string,
  success: boolean
}

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  success: boolean
}
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getSomeData() {
    return this.http.post<myData>('http://portaldeclientes.eltatransportes.com.ar/database.php',{})
    //return this.http.post<myData>('http://www.elta.com.ar/prueba/database.php',{})
  }

  public isLoggedIn(): boolean{
    let status = false;
    if( localStorage.getItem('isLoggedIn') == "true"){
      status = true;
    }
    else{
      status = false;
    }
    return status;
  }

  logout() {
    return this.http.post<logoutStatus>('http://portaldeclientes.eltatransportes.com.ar/logout.php',{})
    //1return this.http.post<logoutStatus>('http://www.elta.com.ar/prueba/logout.php',{})
  }

}