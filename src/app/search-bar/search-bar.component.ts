import { Component, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BookSearchService} from '../book-search.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-search-bar',
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  constructor(public bookSearchService: BookSearchService) {}

  query: string = '';

  onSubmit(): void {
    this.bookSearchService.filters.busqueda = this.query;
    this.bookSearchService.startIndex = 0;
    this.bookSearchService.loadBooks().subscribe();
  }
}
