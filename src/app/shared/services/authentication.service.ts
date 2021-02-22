import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as globalVariables from "../config/global-variables";
import { FormBuilder, Validators } from "@angular/forms";
import { SessionStorageService } from "./session-storage.service";
import { Router } from '@angular/router';
import { LocalStorageService } from './localStorage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {



    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private sessionStorageService: SessionStorageService,
        private localStorageService: LocalStorageService,
        private router: Router,
        private toastrService: ToastrService,
    ) { }

    signUpForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
    })

    logInForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
    })

    signOut() {
        this.signOutAPI().subscribe(
            (res: any) => {
                if (res.message === 'SUCCESS') {
                    this.toastrService.success('Sign out Success')
                    this.sessionStorageService.removeToken();
                    this.sessionStorageService.removeUserName();
                    this.localStorageService.removeCartItemLength()
                    this.router.navigateByUrl('/home')
                }
            }, err => {
                console.log(err);

            })
    }

    singUpAPI() {
        return this.http.post(globalVariables.baseURL + 'users/add', this.signUpForm.value)
    }

    logInAPI() {
        return this.http.post(globalVariables.baseURL + 'users/login', this.logInForm.value)
    }

    signOutAPI() {
        return this.http.post(globalVariables.baseURL + 'users/logout', {})
    }


}