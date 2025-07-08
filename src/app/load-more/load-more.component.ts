import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import {BookSearchService} from '../book-search.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-load-more',
  imports: [NgIf, TranslatePipe],
  templateUrl: './load-more.component.html',
  styleUrl: './load-more.component.css'
})
export class LoadMoreComponent {
  constructor(public bookSearchService: BookSearchService) {}

  get showLoadMore(): boolean {
    return this.bookSearchService.loadMore;
  }


  loadMore() {
    this.bookSearchService.startIndex = this.bookSearchService.startIndex + 9;
    this.bookSearchService.loadMoreBooks().subscribe();

  }
}
