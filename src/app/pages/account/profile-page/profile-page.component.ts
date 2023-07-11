import { CustomValidator } from './../../../validators/custom.validators';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{

  public form: FormGroup;
  public busy: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.required
      ])],
      document: [{ value: '', disabl: true }],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required,
        CustomValidator.EmailValidator
      ])]
    })
  }

  ngOnInit(): void {
    this.busy = true;
    this.dataService.getProfile(this.form.value)
      .subscribe(
        (data: any) => {     
          this.form.controls['name'].setValue(data.name);
          this.form.controls['document'].setValue(data.document);
          this.form.controls['email'].setValue(data.email);
          this.busy = false;
        },
        (error) => {
          console.log(error);
          this.busy = false;
        }
      )
      
  }

  public submit(): void {
    this.dataService.updateProfile(this.form.value);
    this.toastr.success('Dados atualizados com sucesso!')
  }

}
