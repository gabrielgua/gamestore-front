import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioSenhaRequest } from 'src/app/models/usuarios/usuario.senha.request';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AuthRequest } from 'src/app/models/auth/auth.request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    senha: new FormControl('')
  })

  submitting: boolean = false;
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private route: Router) {}
  
  ngOnInit(): void {
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitting = true;
    this.error = false;
    if (this.form.invalid) {
      return;
    }

    const request: AuthRequest = {
      username: this.username?.value,
      senha: this.senha?.value
    };

    this.authService.authenticate(request)
      .then(() => this.route.navigate(['']))
      .catch(error => {
        this.error = !!error
        this.senha?.reset();
        this.submitting = false;        
      })
  }


  private buildForm(): void {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    })
  }

  get username() {
    return this.form.get('username')
  }

  get senha() {
    return this.form.get('senha')
  }

  isInvalid(control: AbstractControl) {
    return control?.dirty && control?.errors;
  }

  isError(controlName: string, error: string): boolean {
    return this.form.controls[controlName].getError(error);
  }
}
