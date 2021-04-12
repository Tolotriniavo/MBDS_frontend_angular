import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Matiere } from '../matieres/matieres.model';
import { LoggingService } from './logging.service';


@Injectable({
  providedIn: 'root'
})
export class MatieresService {
  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  //uri = "http://localhost:8010/api/assignments";
  uri = "https://backendmbds.herokuapp.com/api/matieres"

  getMatieres():Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.uri);
  }
 
}
