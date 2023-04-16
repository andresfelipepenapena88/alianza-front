import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormComponent } from './client-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientInfo } from 'src/app/models/client.model';

describe('ClientFormComponent', () => {
  let component: ClientFormComponent;
  let fixture: ComponentFixture<ClientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init component when add is false', () => {
    component.isAdd = false;
    component.clientForm.controls['email'].setValue('andres');
    expect(component.clientForm.controls['email'].errors).toEqual({ email: true });
  });

  it('should init component when add is false startDate async validator', () => {
    component.isAdd = false;
    component.clientForm.controls['endDate'].setValue('2023-04-01');
    component.clientForm.controls['startDate'].setValue('2023-04-30');
    component.clientForm.controls['name'].setValue(null);
    expect(component.clientForm.controls['startDate'].errors).toEqual({ startDateIsOlderThanEndDate: true });
    expect(component.clientForm.controls['name'].errors).toBeNull();
  });

  it('should init component when add is false endDate async validator', () => {
    component.isAdd = false;
    component.clientForm.controls['startDate'].setValue('2023-04-30');
    component.clientForm.controls['endDate'].setValue('2023-04-01');
    expect(component.clientForm.controls['endDate'].errors).toEqual({ startDateIsOlderThanEndDate: true });
    expect(component.clientForm.controls['email'].errors).toBeNull();
  });

  it('should init component when add is true', () => {
    component.isAdd = true;
    component.ngOnInit();
    component.clientForm.controls['email'].setValue('andres');
    component.clientForm.controls['name'].setValue(null);
    expect(component.clientForm.controls['email'].errors).toEqual({ email: true });
    expect(component.clientForm.controls['name'].errors).toEqual({ required: true });
  });

  it('should excecute sendFormButton when form is invalid', () => {
    component.clientForm.controls['email'].setValue('andres');
    component.sendFormButton();
    expect(component.formSubmited).toBeTrue();
  });

  it('should excecute sendFormButton when is valid and isAdd is false', () => {
    component.isAdd = false;
    const spy = spyOn(component.sendForm, 'emit');
    component.sendFormButton();
    expect(spy).toHaveBeenCalledWith({ add: false, client: component.getControlsValue() });
  });

  it('should excecute sendFormButton when is valid and isAdd is true', () => {
    component.isAdd = true;
    spyOn(component, 'validateNotNullControls').and.returnValue(true);
    const spy = spyOn(component.sendForm, 'emit');
    component.sendFormButton();
    expect(spy).toHaveBeenCalledWith({ add: true, client: component.getControlsValue() });
  });

  it('should excecute getControlsValue', () => {
    const clientResponse: ClientInfo = {
      name: '',
      phone: '',
      email: '',
      startDate:'',
      endDate: ''
    };
    const client: ClientInfo = component.getControlsValue();
    expect(client).toEqual(clientResponse);
  });

  it('should excecute validateNotNullControls when controls are null', () => {
    expect(component.validateNotNullControls()).toBeFalsy();
  });

  it('should excecute validateNotNullControls when controls are filled', () => {
    component.clientForm.controls['name'].setValue('Andres');
    component.clientForm.controls['phone'].setValue('304 387 84 96');
    component.clientForm.controls['email'].setValue('afpena44@gmail.com');
    component.clientForm.controls['startDate'].setValue('2023-04-01');
    component.clientForm.controls['endDate'].setValue('2023-04-30');
    expect(component.validateNotNullControls()).toBeTrue();
  });

  it('should excecute validateDates when pair is null', () => {
    component.clientForm.controls['startDate'].setValue(null);
    component.clientForm.controls['endDate'].setValue(null);
    expect(component.clientForm.controls['startDate'].errors).toBeNull();
    expect(component.clientForm.controls['endDate'].errors).toBeNull();
  });
});
