import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { MatieresService } from '../shared/matieres.service';
import { Assignment } from './assignment.model';
import { Matiere} from '../matieres/matieres.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignments:Assignment[]=[];
  assignmentsRendu:Assignment[]=[];
  assignmentsNonRendu:Assignment[]=[];
  matieres:Matiere[];
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  done:Assignment[]=[];
  note=null;
  nomDevoirAModifier:string;
  idDevoirAModifier:string;

  // on injecte le service de gestion des assignments
  constructor(private assignmentsService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private matieresService:MatieresService,public modalService:ModalService) {}

  ngOnInit() {
    console.log('AVANT AFFICHAGE');
    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;

      this.getMatieresAndAssignments();
    });
      console.log("getAssignments() du service appelé");
  }

  getMatieresAndAssignments(){
    this.matieresService.getMatieres().subscribe(
      data =>{
        this.getAssignments(data);
      }
    );
  }

  drop(event: CdkDragDrop<any>) {
   
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                       
                        this.nomDevoirAModifier = JSON.stringify(event.container.data[event.currentIndex]["nom"]).replace(/['"]+/g, '');
                        this.idDevoirAModifier = JSON.stringify(event.container.data[event.currentIndex]["id"]).replace(/['"]+/g, '');
                        console.log("DATAA"+this.idDevoirAModifier);
                        this.modalService.open('custom-modal-1');
   
  }

  valider(){
    console.log(this.note);
    
    this.assignmentsService.getAssignment(this.idDevoirAModifier).subscribe((assignment) => {
      let assignmentTemp = assignment;
      assignmentTemp.rendu = true;
      assignmentTemp.note = this.note;
      console.log("Nom"+assignmentTemp.nom);

      this.assignmentsService.updateAssignment(assignmentTemp)
      .subscribe(message => {
        console.log(message);
  
        // et on navigue vers la page d'accueil
        window.location.reload();

      })
    
    });
  }
   

  getAssignments(matieres) {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
    .subscribe(data => {
      let assignmentsTemp= [];
      this.assignments = [];
      this.assignmentsRendu = [];
      this.assignmentsNonRendu = [];
      assignmentsTemp = data.docs;
      console.log("taille"+assignmentsTemp.length);
      for(let i=0;i<assignmentsTemp.length;i++){
        
          for(let x=0;x<matieres.length;x++){
            if(assignmentsTemp[i].matiereId==matieres[x]._id){
              assignmentsTemp[i].matiereImage = matieres[x].image;
              assignmentsTemp[i].profImage = matieres[x].imageProf;
              console.log("matiere image"+matieres[x].image);
            }
          }
          if(assignmentsTemp[i].rendu){
            this.assignmentsRendu.push(assignmentsTemp[i]);
          }
          else{
            this.assignmentsNonRendu.push(assignmentsTemp[i]);
          }
      }
      
     
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
    });
  }

  

  

  onDeleteAssignment(event) {
    // event = l'assignment à supprimer

    //this.assignments.splice(index, 1);
    this.assignmentsService.deleteAssignment(event)
      .subscribe(message => {
        console.log(message);
      })
  }

  closeModal(id: string) {
    this.modalService.close(id);
    window.location.reload();
}

  premierePage() {

    
    this.router.navigate(['/home'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }

  pageSuivante() {
    /*
    this.page = this.nextPage;
    this.getAssignments();*/
    this.router.navigate(['/home'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/home'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/home'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }
}
