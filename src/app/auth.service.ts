import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


interface myData {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false
  constructor(private http: HttpClient) { }

  setLoggedIn(value: string, user: string, nombre: string) {
    localStorage.setItem('isLoggedIn', value);
    localStorage.setItem('user', user);
    localStorage.setItem('nombre', nombre);
  }


  getUserDetails(username, password) {
    // post these details to API server return user info if correct
    return this.http.post<myData>('https://dab-development.com/webservice/auth.php', {
    //return this.http.post<myData>('http://www.elta.com.ar/prueba/auth.php', {
      username,
      password
    })
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('user');
    localStorage.removeItem('nombre');
  } 

}