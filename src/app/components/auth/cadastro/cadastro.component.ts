import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../shared/auth-form/validation';
import { AuthService } from 'src/app/service/auth/auth.service';

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

  // submitted: boolean = this.form.touched;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}
  
  ngOnInit(): void {
    this.buildForm();
  }

  handleSubmit(): void {

    if (this.form.invalid) {
      return; //disable button
    }

    console.log(JSON.stringify(this.form.value, null, 2));
    
    
    
  }



  

  private buildForm(): void {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required], [Validation.taken(this.authService)]],
      email: [null, [Validators.required, Validators.email]],
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
