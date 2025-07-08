import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgForOf} from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { BookSearchService } from '../book-search.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-single-filter',
  imports: [
    NgForOf,
    TranslatePipe,
  ],
  templateUrl: './single-filter.component.html',
  styleUrl: './single-filter.component.css',
  animations: [
    trigger('collapse', [
      state('open', style({ height: '*', opacity: 1, paddingTop: '*', paddingBottom: '*' })),
      state('closed', style({ height: '0px', opacity: 0, paddingTop: '0', paddingBottom: '0', overflow: 'hidden' })),
      transition('open <=> closed', [animate('300ms ease-in-out')])
    ])
  ]
})
export class SingleFilterComponent {
  @Input() title: string = '';
  @Input() options: string[] = [];
  @Input() filterName!: 'nivel' | 'materia' | 'tipo' | 'idioma';

  @Output() valueChanged = new EventEmitter<string[]>();

  constructor(public bookSearchService: BookSearchService) {}

  ngOnInit() {
    for (const option of this.options) {
      if (!(option in this.bookSearchService.filters[this.filterName])) {
        this.bookSearchService.filters[this.filterName][option] = false;
      }
    }
  }


  isOpen: boolean = true;
  selected: Set<string> = new Set();

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  toggleOption(option: string): void {
    if (this.selected.has(option)) {
      this.bookSearchService.filters[this.filterName][option] = false;
      this.selected.delete(option);
    } else {
      this.bookSearchService.filters[this.filterName][option] = true;
      this.selected.add(option);
    }

    this.valueChanged.emit(Array.from(this.selected));
  }

  isSelected(option: string): boolean {
    return this.bookSearchService.filters[this.filterName][option];
  }
}
