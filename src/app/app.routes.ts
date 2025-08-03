import { Routes } from '@angular/router';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {HomeComponent} from './home/home.component';
import {HistoriaComponent} from './historia/historia.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

export const routes: Routes = [
  { path: '',
    component: HomeComponent
  },
  { path: 'catalogo',
    component: CatalogoComponent
  },
  { path: 'catalogo/:simplified_name',
    component: BookDetailComponent
  },
  { path: 'historia',
    component: HistoriaComponent
  },
];
