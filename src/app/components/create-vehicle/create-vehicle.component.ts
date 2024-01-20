import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css'],
})
export class CreateVehicleComponent implements OnInit {
  protected createVehicleForm!: FormGroup;
  protected isSubmited = false;
  protected id: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.maxLength(4),
  ]);
  protected plate: FormControl = new FormControl('', [Validators.required]);
  protected ability: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
  ]);
  protected model: FormControl = new FormControl('', [Validators.required]);
  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.createVehicleForm = this.formBuilder.group({
      id: this.id,
      plate: this.plate,
      ability: this.ability,
      model: this.model,
    });
  }

  public shouldShowError(
    controlName: string,
    errorType: string
  ): boolean | undefined {
    const control = this.createVehicleForm.get(controlName);
    return this.isSubmited && control?.hasError(errorType);
  }

  public onCreateVehicle(): void {
    this.isSubmited = true;
    if (this.createVehicleForm.valid) {
      const vehicle = {
        id: this.createVehicleForm.value.id,
        plate: this.createVehicleForm.value.plate,
        ability: `${this.createVehicleForm.value.ability} KG`,
        model: this.createVehicleForm.value.model,
      };
      console.log('vehicle', vehicle);
      this.homeService.createNewVehicle(vehicle).subscribe((response) => {
        console.log('response', response);
        if (response && response.status) {
          alert('Vehiculo creado exitosamente');
          this.resetForm();
          return;
        }
        if (response && !response?.status) {
          alert('Vehiculo registrado anteriormente');
          return;
        }
        this.resetForm();
        return alert('Ocurrio un error intentelo de nuevo');
      });
    }
  }

  public resetForm(): void {
    this.isSubmited = false;
    this.createVehicleForm.reset();
  }
}
