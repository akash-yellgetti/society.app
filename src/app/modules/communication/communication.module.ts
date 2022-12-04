import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsComponent } from './sms/sms.component';
import { EmailComponent } from './email/email.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { ChatComponent } from './chat/chat.component';
import { GroupComponent } from './group/group.component';



@NgModule({
  declarations: [SmsComponent, EmailComponent, DiscussionComponent, ChatComponent, GroupComponent],
  imports: [
    CommonModule
  ]
})
export class CommunicationModule { }
