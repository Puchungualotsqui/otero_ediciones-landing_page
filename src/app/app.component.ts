import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'otero-ediciones';


}
