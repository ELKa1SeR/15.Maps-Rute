import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number]; // asi decimos que opcional que puede que este o no
  public isLoadingPlaces: boolean =false;
  public places: Feature[] = []


  get isUserLocationReady(): boolean{
    return !!this.useLocation  // se hace la doble negación para convertirlo en true
  }

  constructor( private http: HttpClient) {
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

  getPlacesByQuery( query: string = ''){
    //todo: evaluar cuando el query es nulo
    this.http.get<PlacesResponse>('https://api.mapbox.com/search/geocode/v6/reverse?country=es&language=es&longitude=-3.7884891176561553&latitude=37.77183012734264&access_token=pk.eyJ1IjoiZnJhbmxpZWJhbmFzIiwiYSI6ImNseDRsOWc3eDBmYzIyanF0dWp1ZDc5dWkifQ.vfbIIRmbb27AX1e7cB31gw')
    .subscribe( resp =>{
      console.log(resp.features)

      this.isLoadingPlaces = false;
      this.places = resp.features;
    })
  }

}
