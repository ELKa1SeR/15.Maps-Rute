import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../apis/placesApiCliente';
import { MapService } from './map-service.service';

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

  constructor(
    private placesApi: PlacesApiClient,
    private mapService : MapService,
  ) {
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
    if(query.length ===0){
      this.isLoadingPlaces = false;
      this.places = [];
      return
    }

    if(!this.useLocation)throw Error('No hay userLocation')
    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${ query}.json`,{
      params: {
        proximity: this.useLocation.join(',')
      }
    })
    .subscribe( resp =>{

      console.log(resp.features)

      this.isLoadingPlaces = false;
      this.places = resp.features;


      this.mapService.createMarkersFromPlaces( this.places, this.useLocation! );

    })
  }

}
