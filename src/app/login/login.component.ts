import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginFrm: FormGroup;
  validPattern = '^[a-zA-Z0-9]$';

  constructor(
    private rest: RestService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginFrm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        // Validators.pattern(this.validPattern),
      ]),
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginFrm.valid) {
      this.rest.login(this.loginFrm.value).subscribe(
        (resp: any) => {
          console.log(resp);
          localStorage.setItem('token', resp.data);
          this.router.navigate(['/search']);
        },
        (err) => {
          console.log(err);
          this._snackBar.open(err.error.msg, 'OK');
        }
      );
    } else {
      if (this.loginFrm.controls['email'].invalid) {
        this._snackBar.open('Enter valid Email', 'OK');
      } else if (this.loginFrm.controls['password'].invalid) {
        this._snackBar.open(
          'Password must be 8 to 16 charteras and Must be alphanumric only',
          'OK'
        );
      }
    }
  }
}
