import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-assign-driver',
  templateUrl: './assign-driver.component.html',
  styleUrls: ['./assign-driver.component.css'],
})
export class AssignDriverComponent implements OnInit {
  public selectedDriver: number | null = null;
  public drivers: any[] = [];
  public unassignedVehicles: any[] = [];
  public selectedVehicleIds: number[] = [];

  constructor(private homeService: HomeService) {}

  async ngOnInit(): Promise<void> {
    this.reload();
  }

  public onSelectVehicle(vehicleId: number): void {
    const index = this.selectedVehicleIds.indexOf(vehicleId);
    if (index === -1) {
      this.selectedVehicleIds.push(vehicleId);
    } else {
      this.selectedVehicleIds.splice(index, 1);
    }
  }

  public async onAssingVehicles(): Promise<void> {
    if (!this.selectedDriver) {
      return alert('Por favor seleccione elconductor');
    }
    if (this.selectedVehicleIds.length === 0) {
      return alert('Por favor seleccione al menos un vehiculo');
    }
    this.homeService
      .associateVehicles(this.selectedVehicleIds, this.selectedDriver)
      .subscribe((response: any) => {
        if (response && response.status) {
          alert('Conductor asignado exitosamente');
          this.reload();
          return;
        }
        if (response && !response.status) {
          alert('Uno o más vehículos ya están asignados o no existen');
          this.reload();
          return;
        }
        this.reload();
        return alert('Ocurrio un error intentelo de nuevo');
      });
  }

  public reload() {
    this.homeService.getAllDrivers().subscribe((drivers: any) => {
      this.drivers = drivers;
    });
    this.homeService.gellAllUnassignedVehicles().subscribe((vehicles: any) => {
      this.unassignedVehicles = vehicles.vehiclesList;
    });
    this.selectedDriver = null;
    this.selectedVehicleIds = [];
  }
}
