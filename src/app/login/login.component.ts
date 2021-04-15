import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService} from '../shared/auth.service';
import { AppComponent} from '../app.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Location } from '@angular/common';


//import { AuthenticationService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        private appComponent: AppComponent,private snackbar:MatSnackBar,private location:Location
    ) { 
        // redirect to home if already logged in
        /*
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }*/
    }

    openSnackBar(message: string, action: string) {
        this.snackbar.open(message, action, {
          duration: 2000,
        });
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log("returnURLLL"+this.returnUrl);

        
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
/*
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
                
               console.log("email"+this.f.username.value);
               console.log("email"+this.f.password.value);
               this.router.navigate([this.returnUrl]);
               */
                if(this.f.username.value!='' &&  this.f.password.value!=''){
                    this.authenticationService.login(this.f.username.value, this.f.password.value)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.appComponent.isConnected = true;
                            this.location.back();
                            this.openSnackBar("Vous etes connectées","x");
                            console.log("test"+data);
                            
                        },
                        error => {
                            this.error = "Unauthorize";
                            this.loading = false;
                        });
                }
             
    }
    
}
