import { Component, Input } from '@angular/core';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.component.html',
  styleUrls: ['./book-slot.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class BookSlotComponent {
  @Input() tapaUrl!: string;
  @Input() titulo!: string;

  @Input() simplifiedName!: string;

  constructor(private router: Router) {}
}
