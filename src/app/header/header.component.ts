import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    SearchBarComponent,
    TranslatePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  changeLang(event: Event): void {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

}
