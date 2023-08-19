import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/components/auth/shared/validation';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnChanges {
  
  @Input() usuario = new Usuario()

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario']) {
      this.buildForm();      
    }
  }

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get nome() {
    return this.form.get('nome');
  }

  private buildForm(): void {
    if (!this.usuario) {   
      console.log('not usuario');
         
      return;
    }
    
    this.form = this.formBuilder.group({
      email: [this.usuario.email, [Validators.required, Validators.email], [Validation.emailTaken(this.authService)]],
      username: [this.usuario.username, [Validators.required], [Validation.usernameTaken(this.authService)]],
      nome: [this.usuario.nome]
    });
  }

  
  isInvalid(control: AbstractControl) {
    return control?.dirty && control?.errors;
  }



  isError(controlName: string, error: string): boolean {
    return this.form.controls[controlName].getError(error);
  }



}
