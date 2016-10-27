// per: 2.0.0-beta.8 upgrade changelog
//import {Page, NavController, NavParams, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';
import {Modal, NavController, NavParams, ViewController} from 'ionic-angular';
import {UpdateService} from '../../providers/update-service/update-service';
import {HomePage} from '../../pages/home/home';
import {ConcernReceivedPage} from '../../pages/concern-received/concern-received';
import {UpdateReceivedPage} from '../../pages/update-received/update-received';
import {AlertController} from 'ionic-angular';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/update-concern/update-concern.html',
  providers: [UpdateService],
})
export class UpdateConcernPage {
  static get parameters() {
    return [[ViewController], [NavParams], [NavController], [UpdateService], [AlertController]];
  }

  constructor(viewCtrl, navParams, nav, updateService, alertCtrl) {
    this.viewCtrl = viewCtrl;
    this.navParams = navParams;
    this.nav = nav;
    this.navigatedFromPage = navParams.get('page');
    this.alertCtrl = alertCtrl;
    // load the user-selected Tip ID
    this.requestedID = navParams.get('tipId');
    
    // access the Update Concern API service methods
    this.updateService = updateService;
    
    // page display materials
    // TODO: this should move into the database and be hosted by API
    this.quote = {
      title: 'Update an Existing Concern',
      description: 'You can send us additional information about your existing concern here.'
    }

    // storage variables for inbound Request contents to display
    // note: this is data-bound to the UI display
    this.updateTipID = this.requestedID;
    this.updateName = navParams.get('updateName');
    this.updateDate = navParams.get('updateDate');
    this.updateBody = navParams.get('updateBody');
    
    // storage variable for user update input
    // default: empty
    this.updateInput = '';

    // storage variable for server response
    this.updateResponse = null;
  }

  // tasks to run on initial lookup
  ngOnInit() {

  }
  
  // click handler for "done" button
  doneButtonClicked(event) {
    // determine if any content provided in text area
    if (this.updateInput.length > 0) {
        // user input was provided so send that to database
        // create data object to process
        let userResponseData = {
          tip_id: this.updateTipID,
          update: this.updateInput.toString()
        };

        // call server with provided TipID value
        this.updateService.createUserFollowupResponse(userResponseData)
          .subscribe(
            data => {
                // store result from server
                this.updateResponse = data;
            },
            err => console.error(err),
            () => {
              // navigate to Concern Received
              this.navToUpdateReceived();
            }
          );
    } else {
        // no user input provided so this is just a "viewing" interaction
        // thank the user
        this.navToUpdateReceived();
    }
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  helpTapped(event) {
    let alert = this.alertCtrl.create({
        title: 'Need help?',
        message: 'Use this screen to see if any follow-up information has been requested after your report was submitted. Use the text box below to respond to any additional questions or to add more information to a previously submitted report (even if it wasn\'t requested).',
        buttons: ['Okay']
    });

    alert.present();
  }

  navToUpdateReceived() {
    this.nav.push(UpdateReceivedPage, {
        page: this,
        tip_id: this.updateTipID
    });
  }
}

