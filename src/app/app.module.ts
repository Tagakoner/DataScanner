import { PreviousScansPageModule } from './../pages/previous-scans/previous-scans.module';
import { ContinueScansPageModule } from './../pages/continue-scans/continue-scans.module';
import { AddStockPageModule } from './../pages/add-stock/add-stock.module';
import { ContinueScansPage } from './../pages/continue-scans/continue-scans';
import { PreviousScansPage } from './../pages/previous-scans/previous-scans';
import { AddStockPage } from './../pages/add-stock/add-stock';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScanServiceProvider } from '../providers/scan-service/scan-service';
import { IonicStorageModule } from '../../node_modules/@ionic/storage';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SaveProgressProvider } from '../providers/save-progress/save-progress';

@NgModule({
  declarations: [
    MyApp,
    HomePage
   // AddStockPage,
   // PreviousScansPage,
   // ContinueScansPage
  ],
  imports: [
    BrowserModule,
    BrowserModule,    
    HttpModule,
    HttpClientModule,
    AddStockPageModule,
    ContinueScansPageModule,
    PreviousScansPageModule,
    IonicModule.forRoot(MyApp),  
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddStockPage,
    PreviousScansPage,
    ContinueScansPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScanServiceProvider,
    SaveProgressProvider
  ]
})
export class AppModule {}
