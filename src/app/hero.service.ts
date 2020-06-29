import { Injectable } from '@angular/core';
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";

/**
 * InJectable() decorator
 * This marks the class as one that participates in the dependency injection system.
 * - HeroService class is going to provide an injectable service,
 * and it can also have is own injected dependencies
 * 
 * By default, The Angular CLI command ng generate service registers a provider
 * with the root injector for my service by including provider metadata,
 * this is providedIn: 'root' in the @Injectable() decorator.
 * 
 * When i provide the service at the root level, Angular creates a single, shared instance
 * of HeroService and injects into any class that asks for it. Registering the provider
 * in the @Injectable metadata also allows Angular to optimize an app by removing the service
 * if it turns out not to be used after all
 */
@Injectable({
  providedIn: 'root'
})  
export class HeroService {

  /*
   * This is a typical "service-in-service" scenario:
   * inject the MessageService into the HeroService which is injected into the HeroesComponent
   */
  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}
