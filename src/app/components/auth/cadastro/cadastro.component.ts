import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioSenhaRequest } from 'src/app/models/usuarios/usuario.senha.request';
import { AuthService } from 'src/app/service/auth/auth.service';
import Validation from '../shared/validation';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    confirmarSenha: new FormControl('')
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
    this.error = false;
    this.submitting = true;
    if (this.form.invalid || this.senha?.value !== this.confirmarSenha?.value) {
      return;
    }

    const usuario: UsuarioSenhaRequest = {
      email: this.email?.value,
      senha: this.senha?.value,
      username: this.username?.value
    };

    this.authService.register(usuario)
      .then(() => this.route.navigate(['']))
      .catch(error => {
        this.error = !!error;
        this.submitting = false;   
      })
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required], [Validation.usernameTaken(this.authService)]],
      email: [null, [Validators.required, Validators.email], [Validation.emailTaken(this.authService)]],
      senha: [null, [Validators.required, Validators.minLength(5)]],
      confirmarSenha: [null, [Validators.required]],

    },
    { validators: [Validation.match('senha', 'confirmarSenha')]})
  }

  get username() {
    return this.form.get('username')
  }

  get email() {
    return this.form.get('email')
  }

  get senha() {
    return this.form.get('senha')
  }

  get confirmarSenha() {
    return this.form.get('confirmarSenha')
  }

 

  isInvalid(control: AbstractControl) {
    return control?.dirty && control?.errors;
  }

  isError(controlName: string, error: string): boolean {
    return this.form.controls[controlName].getError(error);
  }

 


}
