import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = environment.nodeServer;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public createNewDriver(driverData: any): Observable<any | boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/drivers/create`, driverData, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          console.log('response', response);
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }
  public createNewVehicle(vehicleData: any): Observable<any | boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/vehicles/create`, vehicleData, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          console.log('response', response);
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public getAllDrivers(): Observable<any | boolean> {
    return this.http
      .get(`${this.apiUrl}/drivers/getAllDrivers`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public getDriversVehicles(driverId: number): Observable<any | boolean> {
    return this.http
      .get(`${this.apiUrl}/drivers/getDriversVehicles/${driverId}`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public gellAllUnassignedVehicles(): Observable<any | boolean> {
    return this.http
      .get(`${this.apiUrl}/vehicles/getVehiclesWithoutDriver`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }
  public associateVehicles(
    vehicles: number[],
    driverId: number
  ): Observable<any | boolean> {
    return this.http
      .post<any>(
        `${this.apiUrl}/vehicles/associateVehicles/${driverId}`,
        { vehicles },
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((response) => {
          console.log('response', response);
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public disassociateVehicles(
    vehicles: number[],
    driverId: number
  ): Observable<any | boolean> {
    return this.http
      .post<any>(
        `${this.apiUrl}/drivers/disassociateVehicles/${driverId}`,
        { vehicles },
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((response) => {
          console.log('response', response);
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }
}
