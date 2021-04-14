import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Application de gestion des assignments';
  public isConnected = false;
  public isDisabled = true;

  constructor(private authService:AuthService, private router:Router,
              private assignmentsService:AssignmentsService,private snackbar:MatSnackBar) {}
  
  ngOnInit() {
    let test = localStorage.getItem("currentToken");
    if(test!=null){
      this.isConnected = true;
      this.authService.admin = true;
      this.authService.loggedIn = true;
    }
    console.log("token"+test);
  }

  

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }

 

  login(e) {
    // si je suis pas loggé, je me loggue, sinon, si je suis
    // loggé je me déloggue et j'affiche la page d'accueil
   
    if(this.authService.loggedIn) {
      // je suis loggé
      // et bien on se déloggue
      console.log("milogout")

      this.authService.logOut();

      this.openSnackBar("Vous etes deconnectée","x");
      // on navigue vers la page d'accueil

    } else {
      this.router.navigate(["/login"]);
      e.source.checked = false;
        this.isConnected = false;
     
      
      
      // je ne suis pas loggé, je me loggue
      //this.authService.logIn("admin", "toto");
    }
  }

  peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    this.assignmentsService.peuplerBDAvecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
        this.router.navigate(["/home"], {replaceUrl:true});
      })
  }
  
}

