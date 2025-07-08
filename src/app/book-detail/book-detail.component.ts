import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BookDetailFeatureComponent} from '../book-detail-feature/book-detail-feature.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, BookDetailFeatureComponent, TranslatePipe],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {
  private http = inject(HttpClient);
  private destroy$ = new Subject<void>();

  slug = '';
  descripcionText: string = '';
  book: any;

  constructor(private route: ActivatedRoute) {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.slug = params['simplified_name'];
        this.loadBook(this.slug);
      });
  }

  loadBook(slug: string) {
    const url = 'http://localhost:8080/catalogo/' + slug;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.book = data;
        if (this.book.descripcion) {
          this.http.get(this.book.descripcion, { responseType: 'text' }).subscribe({
            next: (txt) => this.descripcionText = txt,
            error: (err) => console.error('Error loading description text:', err)
          });
        }
      },
      error: (err) => {
        console.error('Book not found or error fetching data:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
