import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  // para controlar las llamadas http
  private debounceTimer?: NodeJS.Timeout;

onQuerychangued(query: string = '') {
if ( this.debounceTimer) clearTimeout(this.debounceTimer)

  this.debounceTimer= setTimeout(() =>{
    console.log('Mandar este query: query');
  }, 500)
}

}
