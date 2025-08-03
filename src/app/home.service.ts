import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private http = inject(HttpClient);

  // Internal state
  public libros: any[] = [];

  // Observable stream for components
  private librosSubject = new BehaviorSubject<any[]>([]);
  libros$ = this.librosSubject.asObservable();

  constructor() { }

  // Call this to load books from backend
  getBooks(): Observable<any[]> {
    const url = '/api/home';

    return this.http.get<any[]>(url).pipe(
      tap(response => {
        this.libros = response;
        this.librosSubject.next(this.libros);
      })
    );
  }

}
