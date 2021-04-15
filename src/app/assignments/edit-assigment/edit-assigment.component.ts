import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { MatieresService } from '../../shared/matieres.service';
import { Matiere } from '../../matieres/matieres.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  // pour le formulaire
  assignment:Assignment;
  matieres:Matiere[];
  nomEleve= "";
  isLinear = true;
  nom = "";
  dateDeRendu = null;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  matiere="";

  matiereAafficher:Matiere=null;
  afficherMatiere: boolean = false;

  

  constructor(
    private assignmentsService: AssignmentsService,
    private matieresService:MatieresService,
    private route: ActivatedRoute,private location:Location,
    private router: Router,private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    
    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/assignment/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      firstCtrl2: ['', Validators.required],
      firstCtrl3: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.getMatieres();

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    

    this.getAssignmentById();
  }

  getMatieres() {
    this.matieresService.getMatieres()
    .subscribe(data => {
      console.log(data[0]);
      this.matieres = data;
      console.log("données reçues");
      
    });
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

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;

      this.nom = assignment.nom;
      this.nomEleve = assignment.auteur;
      this.dateDeRendu = assignment.dateDeRendu;
      this.matiere = assignment.matiereId;

    });
  }


  onSubmit() {
    // on va modifier l'assignment
    if((!this.nom) || (!this.dateDeRendu)) return;

    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.auteur = this.nomEleve;
   
    this.assignment.matiereId = this.matiere
    
    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);
        this.location.back();

        // et on navigue vers la page d'accueil
       
      })
      

  }
}
