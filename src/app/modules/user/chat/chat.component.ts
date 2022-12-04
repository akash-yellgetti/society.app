import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Socket } from 'ngx-socket-io';
import * as _ from 'lodash';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from 'src/app/core/api/http.service';
import {io} from 'socket.io-client/build/index';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  public socket: any;
  public user: any;
  public message: any;
  public to: any = {};
  public users: any = [];
  ngOnInit(): void {
    const user = this.storageService.get('user');
    this.user = user;
    console.log(user);
    console.log('chatController');

    this.socket = io('http://chat.sociosafety.com', {
      transports: ['websocket', 'polling', 'flashsocket']
    });


    this.socket.emit('join', user)

    this.socket.on('users', (users) => {
      // console.log(users);
      this.users = _.filter(users, (res) => {
        return res.user_id !== user.user_id;
      });
    })

    this.socket.on('personal-message', (message) => {
      const user = _.find(this.users, {
        user_id: message.from_user_id
      });
      const messages = _.get(user, 'messages') || [];
      messages.push(message);
      _.set(user, 'messages', messages);
    })
  }

  select_to_user = (user) => {
    this.to = _.find(this.users, {
      user_id: user.user_id
    });
  }

  send = () => {
    const message = {
      from_user_id: this.user.user_id,
      to_user_id: this.to.user_id,
      name: this.user.first_name + " " + this.user.last_name,
      message: _.cloneDeep(this.message),
      datetime: new Date,
    }
    const to_user = _.find(this.users, {
      user_id: this.to.user_id
    });
    const messages = _.get(to_user, 'messages') || [];
    messages.push(message);
    _.set(to_user, 'messages', messages);
    this.message = "";
    this.to = to_user;
    this.socket.emit('personal-message', message)
  }
}
