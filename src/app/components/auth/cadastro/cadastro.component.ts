import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../shared/auth-form/validation';

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
  
  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.buildForm();
  }

  handleSubmit(): void {

    if (this.form.invalid) {
      return; //disable button
    }

    console.log(JSON.stringify(this.form.value, null, 2));
    
    
    
  }

  get f(): { [key: string]: AbstractControl} {
    return this.form.controls;
  }

  

  private buildForm(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
      confirmarSenha: ['', [Validators.required]],

    },
    { validators: [Validation.match('senha', 'confirmarSenha')]})
  }

  isFormInvalid(): boolean {
    return this.form.invalid;
  }

  isControlInvalid(controlName: string) {
    return this.f[controlName].touched && this.f[controlName].errors;
  }

  isError(controlName: string, error: string): boolean {
    return this.f[controlName].getError(error);
  }
  

}
