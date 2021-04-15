import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Matiere } from '../matieres/matieres.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  admin = false;

  constructor(private http:HttpClient) {}
  

  uri = "https://backendmbds.herokuapp.com/api/user";


  login(email,password): Observable<any> {
    return this.http.post(`${this.uri}`, {email,password}).pipe(map(token => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentToken', JSON.stringify(token["token"]).replace(/['"]+/g, ''));
      if(JSON.stringify(token["auth"])=="true"){
        this.loggedIn = true;
        this.admin = true;
        console.log("utilisateur is logged");
      }
      return JSON.stringify(token["auth"]);
    }));
  }

 

  logOut() {
    this.loggedIn = false;
    localStorage.removeItem('currentToken');
    this.admin = false;
  }

  // exemple d'utilisation :
  // isAdmin.then(admin => { console.log("administrateur : " + admin);})
  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.admin);
    });
  }
}
