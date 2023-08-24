import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Animations } from 'src/app/animations/animations';
import Validation from 'src/app/components/auth/shared/validation';
import { AlterarSenhaRequest } from 'src/app/models/usuarios/alterar-senha.request';

@Component({
  selector: 'app-edit-senha',
  templateUrl: './edit-senha.component.html',
  styleUrls: ['./edit-senha.component.css'],
  animations: [Animations]
})
export class EditSenhaComponent implements OnInit {

  @Output() submitted = new EventEmitter<AlterarSenhaRequest>();

  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup = new FormGroup({
    senhaAtual: new FormControl(),
    senhaNova: new FormControl(),
    confirmaSenhaNova: new FormControl()
  }) 

  get senhaAtual() {
    return this.form.get('senhaAtual');
  }

  get senhaNova() {
    return this.form.get('senhaNova');
  }

  get confirmaSenhaNova() {
    return this.form.get('confirmaSenhaNova');
  }

  
  ngOnInit(): void {
    this.assingFormValidators();
  }

  private assingFormValidators(): void {
    this.form = this.formBuilder.group({
      senhaAtual: [null, [Validators.required]],
      senhaNova: [null, [Validators.required, Validators.minLength(5)]],
      confirmaSenhaNova: [null, [Validators.required]]
    }, { validators: [Validation.match('senhaNova', 'confirmaSenhaNova'), Validation.differs('senhaAtual', 'senhaNova')]})
  }


  handleSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const request: AlterarSenhaRequest = {
      senhaAtual: this.senhaAtual?.value,
      senhaNova: this.senhaNova?.value
    }

    this.submitted.emit(request);
    this.form.reset();
  }


  isInvalid(control: AbstractControl) {
    return control?.dirty && control?.errors;
  }

  isError(controlName: string, error: string): boolean {
    return this.form.controls[controlName].getError(error);
  }

  isNotSubmittable(): boolean {
    return this.form.invalid;
  }
 
}
