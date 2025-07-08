import { Component, OnInit, inject } from '@angular/core';
import { BookRowComponent} from '../book-row/book-row.component';
import {HomeService} from '../home.service';
import {NgForOf} from '@angular/common';
import {Subject} from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BookRowComponent,
    NgForOf,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private homeService = inject(HomeService);
  private destroy$ = new Subject<void>();

  homeRows: any[] = [];

  ngOnInit(): void {
    this.homeService.getBooks().subscribe(); // triggers fetch
    this.homeService.libros$.subscribe(rows => {
      this.homeRows = rows;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
