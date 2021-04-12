import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { MatieresService } from '../../shared/matieres.service';
import { Matiere } from '../../matieres/matieres.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  remarque="";
  note = null;

  constructor(
    private assignmentsService: AssignmentsService,
    private matieresService:MatieresService,
    private route: ActivatedRoute,
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
      secondCtrl: ['', Validators.required],
      secondCtrl2: ['', Validators.required],
      controlNote: ['0', Validators.compose([Validators.min(0), Validators.max(20)])]
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
      this.remarque = assignment.remarque;
      this.note = assignment.note;
    });
  }


  onSubmit() {
    // on va modifier l'assignment
    if((!this.nom) || (!this.dateDeRendu)) return;

    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.note = this.note;
    this.assignment.auteur = this.nomEleve;
    this.assignment.remarque = this.remarque;
    this.assignment.matiereId = this.matiere
    
    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);

        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      })
      

  }
}
