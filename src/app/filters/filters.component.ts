import {Component, EventEmitter, Output} from '@angular/core';
import {SingleFilterComponent} from '../single-filter/single-filter.component';
import {BookSearchService} from '../book-search.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  imports: [
    SingleFilterComponent,
    TranslatePipe,
  ],
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  nivelEducativo: string[] = [];
  materia: string[] = [];
  tipo: string[] = [];
  idioma: string[] = [];

  @Output() valueChanged = new EventEmitter<string[]>();

  constructor(public bookSearchService: BookSearchService) {}

  applyFilters() {
    this.bookSearchService.startIndex = 0;
    this.bookSearchService.loadBooks().subscribe();
  }
}
