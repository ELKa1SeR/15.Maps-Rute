import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number]; // asi decimos que opcional que puede que este o no

  get isUserLocationReady(): boolean{
    return !!this.useLocation  // se hace la doble negación para convertirlo en true
  }

  constructor() {
    this.getUserLocation();
   }

  getUserLocation(): Promise<[number, number]>{
    return new Promise ( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        //primero longitud y luego latitud es por Mapbox que trabaja así
        ( {coords}) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        ( err ) => {
          alert('No se pudo obtener lqa geocalizacion')
          console.log(err);
          reject();
        }
      )
    })
  }


}
