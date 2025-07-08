import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { Router, Scroll } from '@angular/router';
import { FiltersComponent } from '../filters/filters.component';
import { BookSlotComponent } from '../book-slot/book-slot.component';
import {LoadMoreComponent} from '../load-more/load-more.component';
import {BookSearchService} from '../book-search.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [FiltersComponent, BookSlotComponent, CommonModule, LoadMoreComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit, OnDestroy {
  libros: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(public bookSearchService: BookSearchService) {}

  ngOnInit(): void {
    this.bookSearchService.startIndex = 0;

    this.bookSearchService.libros$
      .pipe(takeUntil(this.destroy$))
      .subscribe(libros => {
        this.libros = libros;
        console.log('Loaded filtered books:');
      });

    this.bookSearchService.loadBooks().subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
