import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Validation from 'src/app/components/auth/shared/validation';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { UsuarioRequest } from 'src/app/models/usuarios/usuario.request';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnChanges {
  
  @Input() usuario = new Usuario()
  @Output() submitted = new EventEmitter<UsuarioRequest>();

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService) {}


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
      return;
    }

    if (!this.usuario.nome) {
      this.usuario.nome = '';
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


  isValid(control: AbstractControl, currentValue?: any) {
    return control?.dirty && control?.valid && currentValue !== control.value;
  }

  isError(controlName: string, error: string): boolean {
    return this.form.controls[controlName].getError(error);
  }

  isNotSubmittable() {
    return !this.hasChanged() || this.form.invalid || this.username?.pending || this.email?.pending;
  }

  private hasChanged(): boolean {
    return this.username!.value != this.usuario.username 
      || this.email!.value != this.usuario.email
      || this.nome!.value != this.usuario.nome;
  }

  handleSubmit(): void {
    if (this.isNotSubmittable()) {
      return;
    }


    let request: UsuarioRequest = {
      nome: this.nome?.value,
      username: this.username?.value,
      email: this.email?.value
    }


    this.submitted.emit(request);

    if (this.usuario.username != this.username?.value) {
      this.authService.logout();
      this.toastr.success('Credenciais alteradas com sucesso. Faça o login novamente')

    } else {
      this.toastr.success('Detalhes alterados com sucesso.')
    }
  }
}
