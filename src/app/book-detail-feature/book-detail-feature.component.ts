import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-book-detail-feature',
  imports: [
    CommonModule,
  ],
  templateUrl: './book-detail-feature.component.html',
  styleUrl: './book-detail-feature.component.css'
})
export class BookDetailFeatureComponent {
  @Input() label: string = '';
  @Input() value: string | number | null = '';

}
