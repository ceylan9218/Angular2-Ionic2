// per: 2.0.0-beta.8 upgrade changelog
//import {Page, NavController, NavParams, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Inject, Injectable, OnInit} from '@angular/core';
import {HomePage} from '../../pages/home/home';
import {TopicListPage} from '../topic-list/topic-list';
import {QuestionsService} from '../../providers/questions-service/questions-service';
import {AuthenticateService} from '../../providers/authenticate-service/authenticate-service';
import * as _ from 'lodash';

@Component({
  providers: [QuestionsService, AuthenticateService],
  templateUrl: 'build/pages/hotline-dialer/hotline-dialer.html',
})
export class HotlineDialerPage {
  static get parameters() {
    return [[ViewController], [NavParams], [NavController], [QuestionsService], [AuthenticateService], [AlertController]];
  }

  constructor(viewCtrl, navParams, nav, questionsService, authenticateService, alertCtrl) {
    this.viewCtrl = viewCtrl;
    this.navParams = navParams;
    this.nav = nav;
    this.navigatedFromPage = navParams.get('page');
    this.questionsService = questionsService;
    this.authenticateService = authenticateService;
    this.alertCtrl = alertCtrl;
    
    this.quote = {
      title: 'Call the Hotline',
      description: 'Your company provides this anonymous hotline if you prefer to speak to an operator.'
    }
    
    // placeholder phone number
    this.hotlineNumber = "1-800-555-5555";
  }

  ngOnInit() {
    
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  navToTopicListPage(event) {
    this.authenticateService.authenticate()
      .subscribe(
        data => this.data = data,
        err => console.error(err),
        () => {

          this.questionsService.topicList
            .subscribe(
              data => this.topicList = data,
              err => console.error(err),
              () => {
        
                this.nav.push(TopicListPage, {
                  page: this,
                  topicList: this.topicList,
                }, this.questionsService);
        
              }
            );
        
        }
      );
  }
  
  helpTapped(event) {
    let alert = this.alertCtrl.create({
        title: 'Need help?',
        message: "If you need to talk to a person about this concern, click the phone icon above to dial your company's anonymous reporting hotline.",
        buttons: ['Okay']
      });
      alert.present();
  }
  
  goBack(event) {
    this.nav.setRoot(HomePage);
  }

  navToHomePage(event) {
    // hard navigate to Home page - don't allow backwards travel to page
    this.nav.setRoot(HomePage);
  }
}
