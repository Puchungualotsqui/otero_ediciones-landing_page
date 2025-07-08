import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailFeatureComponent } from './book-detail-feature.component';

describe('BookDetailFeatureComponent', () => {
  let component: BookDetailFeatureComponent;
  let fixture: ComponentFixture<BookDetailFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
