import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from "../../../shared/services/authentication.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(
    public auth: AuthenticationService,
    private router: Router,
    private toastrService: ToastrService,
    private sessionService: SessionStorageService
  ) { }

  ngOnInit(): void {
    if(this.sessionService.Token) {
      this.router.navigateByUrl('/home')
    }
  }

  onFormSubmit() {
    if (this.auth.signUpForm.valid) {
      this.auth.singUpAPI().subscribe(
        (res: any) => {
          if (res.message === 'SUCCESS') {
            console.log('Success');
            this.toastrService.success('Account created successfully')
            this.sessionService.setToken(res.token)
            this.sessionService.setUserName(res.user.name)
            this.auth.signUpForm.reset();
            this.router.navigateByUrl('/home');
          }
        }, err => {
          console.log(err);
        }
      )

    }
  }

}
