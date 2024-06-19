import { Component, OnInit } from '@angular/core';
import { MapsModule } from '../../maps.module';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.css'
})
export class MapScreenComponent implements OnInit{

  constructor( private placesService:PlacesService) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
