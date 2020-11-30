//RUTAS
import { APP_ROUTING } from './app.routes';

//@ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './components/shared/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { HestaticoComponent } from './components/shared/hestatico/hestatico.component';

//AUTH GUARD


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    HestaticoComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
