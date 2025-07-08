import {Component, Input} from '@angular/core';
import {BookSlotComponent} from '../book-slot/book-slot.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-book-row',
  imports: [
    BookSlotComponent,
    NgForOf
  ],
  templateUrl: './book-row.component.html',
  styleUrl: './book-row.component.css'
})
export class BookRowComponent {
  @Input() title: string = '';
  @Input() books: any[] = [];
}
