// per: 2.0.0-beta.8 upgrade changelog
//import {Page, NavController, NavParams, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';
import {Modal, NavController, NavParams, ViewController} from 'ionic-angular';
//import {Storage, LocalStorage} from 'ionic-angular';
import {Http, Headers, HTTP_PROVIDERS, URLSearchParams} from '@angular/http';
import {AlertController} from 'ionic-angular';
import {UpdateConcernPage} from '../update-concern/update-concern';
import {HomePage} from '../../pages/home/home';
import {UpdateService} from '../../providers/update-service/update-service';
import * as _ from 'lodash';

@Component({
  providers: [UpdateService],
  templateUrl: 'build/pages/select-concern/select-concern.html',
})
export class SelectConcernPage {
  static get parameters() {
    return [[ViewController], [NavParams], [UpdateService], [NavController], [AlertController]];
  }

  constructor(viewCtrl, navParams, updateService, nav, alertCtrl) {
    this.viewCtrl = viewCtrl;
    this.navParams = navParams;
    this.nav = nav;
    this.navigatedFromPage = navParams.get('page');
    this.alertCtrl = alertCtrl;
    this.updateService = updateService;
    
    // styling for the stored Tip ID alert pop-up
    this.alertOptions = {
        title: "Prior Tip IDs",
        subTitle: "If you do not see your Tip ID listed here, please type it in the text input area."
    }
    
    // variable for storing the Tip ID-Firebase ID array
    // default: empty array (none found)
    this.storedTipIDs = [];
    
    // variable for storing the *selected* Tip ID to use
    // default: empty
    this.selectedTipID = '';
    
    // variable for storing the user input Tip ID
    this.inputTipID = '';
    
    // set the display contents for the page's dark-blue info region
    this.quote = {
      title: 'Select an Existing Concern',
      description: 'See requests for more information and provide additional details on your previous concern.'
    }
    
    // storage variable for API response to TipID lookup
    this.lookupResponse = {};
  }
  
  // things to do on page-load
  ngOnInit() {
    // fetch stored Tip ID array on initial page load
    this.getLtsTipIDs();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  // handle input on the stored Tip ID dropdown
  storedTipIDSelection($event) {
    console.log("User selected a Tip ID from existing list");
    // don't have to do anything else since data binding is same as for text input
  }
  
  
  // get any stored Tip IDs from long term storage
  getLtsTipIDs() {
    console.log("checking for stored Tip IDs");
    // test to see if local storage variable for TipIDs exists
    if ((localStorage.length > 0) && ("ltsTipIDsV2" in localStorage)) {
        // long-term storage variable for Tip IDs exists
        // so parse the stored JSON and load it into working variable for use by Angular
        this.storedTipIDs = JSON.parse(localStorage.getItem('ltsTipIDsV2'));
        console.log("loaded " + this.storedTipIDs.length + " stored IDs...");
    } else {
        // note lack of existing ID Pairs
        console.log("no stored IDs found.");
    }
  }
  
  // going back from this page should take the user to "Home" page
  goBack(event) {
    this.nav.setRoot(HomePage);
  }

  // move forward with selected concern
  navToUpdateConcern() {
  
    // check if a Tip ID was entered
    if ((this.inputTipID == '') || (this.inputTipID == 'placeholder')) {
        // no tip ID entered so display a notice to user
        let alert = this.alertCtrl.create({
            title: "Enter your Concern ID",
            message: "Please enter your Concern ID to view requests for information or add an update to your previous concern.",
            buttons: ['Okay']
        });
        alert.present();
    } else {
        // load variable with input from user
        this.selectedTipID = this.inputTipID;
        // note which tip ID was selected when continuing forward
        console.log("Selected Tip ID: " + this.selectedTipID);
        
        // call server with provided TipID value
        this.updateService.lookupLastFollowupByTipID({ tip_id: this.selectedTipID })
          .subscribe(
            data => {
                // store result from server
                this.lookupResponse = data;
            },
            err => console.error(err),
            () => {
                // check if response positive
                if (typeof this.lookupResponse.message !== 'undefined') {
                    // message defined --> error condition
                    // alert the user
                    let alert = this.alertCtrl.create({
                        title: "Invalid TipID",
                        message: "The TipID provided did not match the format of squibit! IDs.  Please try again.",
                        buttons: ['Okay']
                    });
                    alert.present();
                } else {
                    // response contains valid followup-response data
                    // log some info about the Concern
                    console.log("TipID match found with internal ID: " + this.lookupResponse.fbId);
                    // TODO: replace with real page action
                    this.nav.push(UpdateConcernPage, {
                      page: this,
                      tipId: this.selectedTipID,
                      updateName: this.lookupResponse.updateName,
                      updateDate: this.lookupResponse.updateDate,
                      updateBody: this.lookupResponse.updateBody
                    });
                }
            }
          );
    }
  }

  // show the "Help" alert pop-up with static contents
  helpTapped(event) {
    let alert = this.alertCtrl.create({
        title: 'Need help?',
        message: 'This is the page to re-open a previously submitted report. Please enter your corresponding squibit ID or select it from the \'stored ID\' dropdown.',
        buttons: ['Okay']
    });
    alert.present();
  }
}
