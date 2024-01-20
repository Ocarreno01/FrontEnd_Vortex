import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.css'],
})
export class CreateDriverComponent implements OnInit {
  protected createDriverForm!: FormGroup;
  protected isSubmited = false;
  protected id: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
  ]);
  protected identification: FormControl = new FormControl('', [
    Validators.required,
  ]);
  protected firstName: FormControl = new FormControl('', [Validators.required]);
  protected lastName: FormControl = new FormControl('', [Validators.required]);
  protected phone: FormControl = new FormControl('', [Validators.required]);
  protected address: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.createDriverForm = this.formBuilder.group({
      id: this.id,
      identification: this.identification,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      phone: this.phone,
    });
  }

  public shouldShowError(
    controlName: string,
    errorType: string
  ): boolean | undefined {
    const control = this.createDriverForm.get(controlName);
    return this.isSubmited && control?.hasError(errorType);
  }

  public onCreateDriver(): void {
    this.isSubmited = true;
    if (this.createDriverForm.valid) {
      const driver = {
        id: this.createDriverForm.value.id,
        identification: this.createDriverForm.value.identification,
        firstName: this.createDriverForm.value.firstName,
        lastName: this.createDriverForm.value.lastName,
        phone: this.createDriverForm.value.phone,
        address: this.createDriverForm.value.address,
      };
      this.homeService.createNewDriver(driver).subscribe((response) => {
        console.log('response', response);
        if (response && response.status) {
          alert('Conductor creado exitosamente');
          this.resetForm();
          return;
        }
        if (response && !response.status) {
          alert('Conductor registrado anteriormente');
          this.resetForm();
          return;
        }
        this.resetForm();
        return alert('Ocurrio un error intentelo de nuevo');
      });
    }
  }

  public resetForm(): void {
    this.isSubmited = false;
    this.createDriverForm.reset();
  }
}
