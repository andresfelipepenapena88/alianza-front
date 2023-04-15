import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { ClientInfo } from 'src/app/models/client.model';
import { of } from 'rxjs';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientForm = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  formSubmited = false;

  @Output()
  sendForm: EventEmitter<{add: boolean; client: ClientInfo}> = new EventEmitter();

  @Input()
  isAdd: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.clientForm.controls['startDate'].addAsyncValidators(this.validateDates('endDate'));
    this.clientForm.controls['endDate'].addAsyncValidators(this.validateDates('startDate'));
    this.clientForm.controls['email'].setValidators([ Validators.email ]);
    if (this.isAdd) {
      this.clientForm.controls['name'].setValidators([ Validators.required ]);
      this.clientForm.controls['email'].addValidators([ Validators.required ]);
      this.clientForm.controls['startDate'].setValidators([ Validators.required ]);
    }
  }

  sendFormButton() {
    if (this.clientForm.invalid) {
      this.formSubmited = true;
      return;
    }
    if (!this.isAdd) {
      this.sendForm.emit({ add: false, client: this.getControlsValue() });
    } else if (this.validateNotNullControls()) {
      this.sendForm.emit({ add: true, client: this.getControlsValue() });
    }
  }

  getControlsValue(): ClientInfo {
    const name = this.clientForm.controls['name'].value ? this.clientForm.controls['name'].value : '';
    const phone = this.clientForm.controls['phone'].value ? this.clientForm.controls['phone'].value : '';
    const email = this.clientForm.controls['email'].value ? this.clientForm.controls['email'].value : '';
    const startDate = this.clientForm.controls['startDate'].value ? this.clientForm.controls['startDate'].value : '';
    const endDate = this.clientForm.controls['endDate'].value ? this.clientForm.controls['endDate'].value : '';

    const client: ClientInfo = {
      name,
      phone,
      email,
      startDate,
      endDate
    };

    return client;
  }

  validateNotNullControls(): boolean {
    return (this.clientForm.controls['name'].value != null && this.clientForm.controls['name'].value != '')
      && (this.clientForm.controls['email'].value != null && this.clientForm.controls['email'].value != '')
      && (this.clientForm.controls['startDate'].value != null && this.clientForm.controls['startDate'].value != '');
  }

  /* 
    Funcion que valida que la fecha startDate sea menor a EndDate
    esta funcion se ejecuta en ambos input tipo date (startDate o endDate)
    control es el input que está ejecutando el validador y
    controlPair es un string que representa la clave del input contrario
    ej. si control es endDate, controlPair es 'startDate'
    o si control es startDate, controlPair es 'endDate'
  */ 
  validateDates(controlPair: string): AsyncValidatorFn {
    return (control: AbstractControl) =>  {
      // Esta validacion se hace porque al acceder a controls[controlPair] TypeScript un error
      const pair = controlPair == 'endDate' ? this.clientForm.controls['endDate'].value : this.clientForm.controls['startDate'].value;
      
      if(pair == null || control.value == null) {
         return of(null);
      }
      let startDate = '';
      let endDate = '';
      if (controlPair == 'endDate') {
        endDate = pair ? pair : '';
        startDate = control.value ? control.value : '';
      }
      if (controlPair == 'startDate') {
        startDate = pair ? pair : '';
        endDate = control.value ? control.value : '';
      }
      return of(new Date(startDate).getTime() > new Date(endDate).getTime() ? { startDateIsOlderThanEndDate: true } : null);
    }
  }

}
