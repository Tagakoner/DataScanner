import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SaveProgressProvider } from '../../providers/save-progress/save-progress';

/**
 * Generated class for the ContinueScansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-continue-scans',
  templateUrl: 'continue-scans.html',
})
export class ContinueScansPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public savedProgress: SaveProgressProvider) {
  }

  previousScans: any[] = [];

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavedScansPage');

    this.savedProgress.getAllKeys().then(data => this.previousScans = data);

    
  }

}
