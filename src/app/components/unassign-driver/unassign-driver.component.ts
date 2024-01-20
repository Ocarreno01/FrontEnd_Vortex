import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-unassign-driver',
  templateUrl: './unassign-driver.component.html',
  styleUrls: ['./unassign-driver.component.css'],
})
export class UnassignDriverComponent implements OnInit {
  public selectedDriver: number | null = null;
  public drivers: any[] = [];
  public vehicles: any[] = [];
  public selectedVehicleIds: number[] = [];

  constructor(private homeService: HomeService) {}

  async ngOnInit(): Promise<void> {
    this.reload();
  }

  public reload() {
    this.homeService.getAllDrivers().subscribe((drivers: any) => {
      this.drivers = drivers;
      this.selectedDriver = null;
      this.vehicles = [];
    });
  }

  public async onSelectDriver() {
    this.homeService
      .getDriversVehicles(<number>this.selectedDriver)
      .subscribe((response: any) => {
        this.vehicles = response.vehicles;
      });
  }

  public onSelectVehicle(vehicleId: number): void {
    const index = this.selectedVehicleIds.indexOf(vehicleId);
    if (index === -1) {
      this.selectedVehicleIds.push(vehicleId);
    } else {
      this.selectedVehicleIds.splice(index, 1);
    }
  }

  public async onUnassignVehicle() {
    console.log('selectedDriver', this.selectedDriver);
    if (!this.selectedDriver) {
      return alert('Por favor seleccione el conductor');
    }
    console.log('this.selectedVehicleIds', this.selectedVehicleIds);
    if (this.selectedVehicleIds.length === 0) {
      return alert('Por favor seleccione al menos un vehiculo');
    }
    this.homeService
      .disassociateVehicles(this.selectedVehicleIds, this.selectedDriver)
      .subscribe((response: any) => {
        if (response && response.status) {
          alert('Vehiculo desasignado exitosamente');
          this.reload();
          return;
        }
        if (response && !response.status) {
          alert('Uno o más vehículos ya están desasignados o no existen');
          this.reload();
          return;
        }
        this.reload();
        return alert('Ocurrio un error intentelo de nuevo');
      });
  }
}
