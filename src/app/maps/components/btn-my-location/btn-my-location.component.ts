import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  constructor(
    private placesServices: PlacesService,
    private mapService: MapService
  ){}

goToMyLocation() {

  if ( !this.placesServices.isUserLocationReady) throw Error ('No hay ubicación de usuario');
  if ( !this.mapService.isMapReady) throw Error ('No se hay mapa disponible');

  // la admiaracion es por que ya lo se porque lo revise 
  this.mapService.flyTo(this.placesServices.useLocation!);
}

}
