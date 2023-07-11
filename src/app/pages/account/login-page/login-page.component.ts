import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom.validators';
import { Security } from 'src/app/utils/security.util';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    const token = Security.getToken();
    if (token) {
      this.setLoading(true)
      this
        .service
        .refreshToken()
        .subscribe(
          (data: any) => {
            this.setLoading(false)
            this.setUser(data.customer, data.token);
          },
          (err) => {
            localStorage.clear();
            this.setLoading(false)
          }
        );
    }
  }

  submit() {
    this.setLoading(true)
    this
      .service
      .authenticate(this.form.value)
      .subscribe(
        (data: any) => {
          this.setLoading(false)
          this.setUser(data.customer, data.token);
        },
        (err) => {
          console.log(err);
          this.setLoading(false)
        }
      );
  }

  setUser(user: User, token: string) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }


  private setLoading(value: boolean) {
    this.busy = value
  }
}