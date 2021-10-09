import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { FelipeCurrencyComponent } from './felipe-currency/felipe-currency.component';
import { FelipeWalletComponent } from './felipe-wallet/felipe-wallet.component';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FelipeWalletService } from './felipe-wallet.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'currency', component: FelipeCurrencyComponent },
      { path: 'wallet', component: FelipeWalletComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    FelipeCurrencyComponent,
    FelipeWalletComponent,
  ],
  bootstrap: [AppComponent],
  providers: [FelipeWalletService],
})
export class AppModule {}
