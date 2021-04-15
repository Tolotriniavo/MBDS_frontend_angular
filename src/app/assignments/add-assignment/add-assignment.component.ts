import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere } from '../../matieres/matieres.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatieresService } from '../../shared/matieres.service';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  matieres:Matiere[];
  isLinear = true;
  nom = '';
  nomEleve= '';
  dateDeRendu = null;
  matiere ='';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  afficherMatiere:boolean= false;
  matiereAafficher:Matiere;

  constructor(private assignmentsService:AssignmentsService,
    private matieresService:MatieresService,
              private router:Router,private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      firstCtrl2: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.getMatieres();

  }

  afficher(data:Matiere){
    console.log("Info Matiere"+data.imageProf);
    console.log(data.nom);
    console.log(data.nomProf);
    this.afficherMatiere = true;
  }

  getMatiereById(){
    console.log("ETOO"+this.matiere);
    this.matieresService.getMatiere(this.matiere).subscribe(
      data=>{
          this.matiereAafficher = data;
          this.afficher(this.matiereAafficher);
      }
    );
  }

  onSubmit() {
    
    if((!this.nom) || (!this.dateDeRendu)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.note = null;
    nouvelAssignment.auteur = this.nomEleve;
    nouvelAssignment.remarque = null;
    nouvelAssignment.matiereId = this.matiere


    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/home/apresInsert"]);
        
        
         
      });
      
  }

  getMatieres() {
    this.matieresService.getMatieres()
    .subscribe(data => {
      console.log(data[0]);
      this.matieres = data;
      console.log("données reçues");
      
    });
    
  }

}
