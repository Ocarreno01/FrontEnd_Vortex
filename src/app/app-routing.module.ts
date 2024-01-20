import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { CreateDriverComponent } from './components/create-driver/create-driver.component';
import { CreateVehicleComponent } from './components/create-vehicle/create-vehicle.component';
import { AssignDriverComponent } from './components/assign-driver/assign-driver.component';
import { UnassignDriverComponent } from './components/unassign-driver/unassign-driver.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'createDriver', component: CreateDriverComponent },
  { path: 'createVehicle', component: CreateVehicleComponent },
  { path: 'assignDriver', component: AssignDriverComponent },
  { path: 'unassignDriver', component: UnassignDriverComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
