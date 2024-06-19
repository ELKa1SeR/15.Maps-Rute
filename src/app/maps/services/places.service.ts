import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number]; // asi decimos que opcional que puede que este o no

  get isUserLocationReady(): boolean{
    return !!this.useLocation  // se hace la doble negación para convertirlo en true
  }
  constructor() { }
}
