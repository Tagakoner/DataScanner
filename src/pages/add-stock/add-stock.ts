import { SaveProgressProvider } from './../../providers/save-progress/save-progress';
import { ScanServiceProvider } from './../../providers/scan-service/scan-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as papa from 'papaparse';


@IonicPage()
@Component({
  selector: 'page-add-stock',
  templateUrl: 'add-stock.html',
})
export class AddStockPage {

 // csvData: any[] = [];
 // headerRow: any[] = [];
  //private codes : FormGroup;
  scannedItem: {barcode: string, quantity: number, date: string}[] = [];
  public itemQuantity: number = 1;
  
  @ViewChild('barcode_textarea') barcode_textarea ;
  @ViewChild('amount_input') amount_input ;
  scanForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private scanService: ScanServiceProvider,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private saveProgress: SaveProgressProvider) {

     // this.codes = this.formBuilder.group({
       // title: ['', Validators.required],
        //description: [''],
      //});

      this.scanForm = new FormGroup({ barcode: new FormControl(), amount: new FormControl() });


      this.scanForm = this.formBuilder.group({
        "barcode":["",Validators.required],
        "amount":["",Validators.required]
        //"address": ["",Validators.required]
      });

  }

  ionViewDidLoad() {
    this.barcode_textarea.setFocus();
 }

  public saveScans(){
   // debugger;
    this.scannedItem.forEach(item => {
      var returnValue = this.saveProgress.saveScan(item)
        .then(data => console.log("promised returned value = " + data));
      //console.log("saved item = " + returnValue);
    });
  }
  
  addScan( value: {barcode: string, amount: number}){
   // let returnValue = this.scanService.saveScan( value );
    var date = new Date();
    var scannedStockItem = {
                            "barcode": value.barcode,
                            "quantity": value.amount,
                            "date": date.toString()
                            };

    this.scanService.saveScanCsv(scannedStockItem);         
    this.scannedItem = this.scanService.saveScan(scannedStockItem); 
    this.scanForm.reset();
    this.scanForm.controls["amount"].setValue(1);
    this.barcode_textarea.setFocus();
    console.log("stock stuff: ", this.scannedItem);
    //this.presentScannedItemAlert("scannedStockItem created", scannedStockItem.barcode, scannedStockItem.quantity.toString(), scannedStockItem.date);
    //this.scanService.saveScan( this.Codes.toString(), this.Quantity );
  }


  presentScannedItemAlert( title: string, subTitle: string, quantity: string, dateTime: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: "value scanned: " + subTitle + " quantity: " + quantity + ", at date: " + dateTime, 
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentGenericAlert( title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: "value scanned: " + subTitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  trackByFn(index: any, item: any) {
    return index;
  }
  


  downloadCSV() {
    let csv = papa.unparse({
      fields: ["barcode","quantity","date"],
      //fields: ["barcode"],
      data: this.scannedItem
    });
 
    // Dummy implementation for Desktop download purpose
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ///---- Popups
  showEditItem(item){
    const editIndex = this.scannedItem.indexOf(item);
    let alert = this.alertCtrl.create({
      title: 'Edit item',
      inputs: [
        {
          name: 'Barcode',
          value: item.barcode
        },
        {
          name: 'Quantity',
          value: item.quantity
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            /*
            console.log("--------save clicked-----------");
            console.log("old barcode value: " + this.scannedItem[editIndex].barcode);
            console.log("old quantity value: " + this.scannedItem[editIndex].quantity);
            console.log("--------input values-----------");
            console.log("input barcode value: " + data.Barcode);
            console.log("input quantity value: " + data.Quantity);
            */
            this.scannedItem[editIndex].barcode = data.Barcode;
            this.scannedItem[editIndex].quantity = data.Quantity;
            /*
            console.log("--------new values-----------");
            console.log("new barcode value: " + this.scannedItem[editIndex].barcode);
            console.log("new quantity value: " + this.scannedItem[editIndex].quantity);
            */
          }
        }
      ]
    });
    alert.present();
  }

  confirmDeletion(item) {  
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to remove this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');

          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('delete clicked');
            const removalIndex = this.scannedItem.indexOf(item);
            if (removalIndex != -1)
            {
              this.scannedItem.splice(removalIndex, 1);
            }
          }
        }
      ]
    });
    alert.present();
  }
  ///----- end popups

}
