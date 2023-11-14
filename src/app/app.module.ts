import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoginComponent} from "./page/login/login.component";
import {SidebarComponent} from "./dashboard/sidebar/sidebar.component";
import {ToggleDirective} from "./dashboard/sidebar/toggle.directive";
import {HomeComponent} from "./page/home/home.component";
import {ConfirmaDeleteComponent} from "./util/confirma-delete/confirma-delete.component";
import {ProductComponent} from "./page/product/product.component";
import {SaleComponent} from "./page/sale/sale.component";
import {SaleDialogComponent} from "./page/sale-dialog/sale-dialog.component";
import {SalesListComponent} from "./page/sales-list/sales-list.component";
import {HttpInterceptorModule} from "./service/headerInterceptor.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatBadgeModule} from "@angular/material/badge";
import {MatChipsModule} from "@angular/material/chips";
import {LoginService} from "./service/login.service";
import {SaleService} from "./service/sale.service";
import {PaymentService} from "./service/payment.service";
import {ProductService} from "./service/product.service";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {NgxMaskModule} from "ngx-mask";
import {registerLocaleData} from "@angular/common";
import localePt from '@angular/common/locales/pt';


registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ToggleDirective,
    HomeComponent,
    ConfirmaDeleteComponent,
    ProductComponent,
    SaleComponent,
    SaleDialogComponent,
    SalesListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTooltipModule,
    MatRippleModule,
    MatTabsModule,
    MatDividerModule,
    MatToolbarModule,
    MatGridListModule,
    FormsModule,
    CurrencyMaskModule,
    HttpInterceptorModule, //setar token no header

    MatDatepickerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatBadgeModule,
    MatChipsModule,
     /*NgxMaskModule.forRoot(
          { // não salvar a mascara
            dropSpecialCharacters: false
          }
      ),*/

  ],
  providers: [
    ProductService,
    PaymentService,
    SaleService,
    LoginService,
    //informar formato da data local
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
