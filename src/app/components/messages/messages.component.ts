import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-messages',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
}
