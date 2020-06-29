import { Injectable } from '@angular/core';

/*
 * The service exposes its cache of messages and two method:
 * one to add() a message to the cache
 * another to clear() the cache 
 */
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  constructor() { }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
