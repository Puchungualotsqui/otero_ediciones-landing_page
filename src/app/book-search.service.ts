import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

function normalizeString(input: string): string {
  return input
    .normalize('NFD')                      // split letters and accents
    .replace(/[\u0300-\u036f]/g, '')       // remove accents (tildes)
    .toLowerCase()                         // lowercase
    .replace(/\s+/g, '_');                 // replace space(s) with underscores
}


@Injectable({
  providedIn: 'root'
})


export class BookSearchService {

  private http = inject(HttpClient);

  startIndex: number = 0;
  loadMore: boolean = true;

  filters: {
    nivel: Record<string, boolean>;
    materia: Record<string, boolean>;
    tipo: Record<string, boolean>;
    idioma: Record<string, boolean>;
    busqueda: string;
  } = {
    nivel: {},       // e.g., { 'Primaria': true, 'Secundaria': false }
    materia: {},
    tipo: {},
    idioma: {},
    busqueda: '',
  };

  public libros: any[] = [];

  private librosSubject = new BehaviorSubject<any[]>([]);
  libros$ = this.librosSubject.asObservable();

  getNormalizedQueryParams(): Record<string, string> {
    const getSelected = (map: Record<string, boolean>): string[] =>
      Object.entries(map)
        .filter(([_, checked]) => checked)
        .map(([key]) => normalizeString(key)); // 👈 normalize here

    const queryParams: any = {};

    const nivel = getSelected(this.filters.nivel);
    const materia = getSelected(this.filters.materia);
    const tipo = getSelected(this.filters.tipo);
    const idioma = getSelected(this.filters.idioma);

    if (nivel.length > 0) queryParams.nivel = nivel.join(',');
    if (materia.length > 0) queryParams.materia = materia.join(',');
    if (tipo.length > 0) queryParams.tipo = tipo.join(',');
    if (idioma.length > 0) queryParams.idioma = idioma.join(',');
    if (this.filters.busqueda) queryParams.busqueda = normalizeString(this.filters.busqueda);
    queryParams.startIndex = this.startIndex;

    return queryParams;
  }

  getBooks(): Observable<any[]> {
    const queryParams = this.getNormalizedQueryParams();
    const queryString = new URLSearchParams(queryParams).toString();

    const baseUrl = 'http://localhost:8080/catalogo';
    const finalUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

    console.log('finalUrl', finalUrl);

    return this.http.get<any[]>(finalUrl).pipe(
      tap(response => {
        this.loadMore = Array.isArray(response) && response.length >= 9;
      })
    );
  }

  loadBooks(): Observable<any[]> {
    return this.getBooks().pipe(
      tap(response => {
        this.libros = response;
        this.librosSubject.next(this.libros);
      })
    );
  }

  loadMoreBooks(): Observable<any[]> {
    console.log(this.startIndex)
    return this.getBooks().pipe(
      tap(response => {
        console.log(this.startIndex)
        this.libros = [...this.libros, ...response]; // 👈 append new books
        this.librosSubject.next(this.libros);        // notify component
      })
    );
  }

}
