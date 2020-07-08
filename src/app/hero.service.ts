import { Injectable } from '@angular/core';
/**
 * All HttpClient methods return an RxJS Observable of something
 * HTTP is a request/response protocol. You make a request, it returns a single response
 * In general, an observable can return multiple values over time.
 * An observable from HttpClient always emits a single value and them completes, never to emit again.
 * This particular HttpClient.get() call returns an Observable<Hero[]>; that is,
 * *an observable of hero arrays.
 * In practice, it will only return a single hero array.
 */
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { catchError, map, tap } from "rxjs/operators";

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
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /**
     * Define the heroesURL of the form :base/:collectionName with the address of the heroes resource on the server.
     * Here base is the resource to which requests are made,
     * and the collectionName is the heroes data object in the in-memory-data-service.ts
     * 
     * URL to web api
     */
    private heroesUrl = 'api/heroes';

    /**
     * Most web APIs support a get by id request in the form :baseURL/:id
     * 
     * Here, the base URL is the heroesURL defined in the Heroes and HTTP section (api/heroes)
     * and id is the nubmer of the hero that you want to retrieve.
     * For example, api/heroes/11.
     * 
     * GET hero by id. Will 404 if id not found.
     * 
     * THREE significant differences from getHeroes():
     * - getHero() constructs a request URL with the desired hero's id
     * - The server should respond with a single hero rather than an array of heroes.
     * - getHero() returns an Observable<Hero> (*an observable of Hero objects) rather than an obervvable of hero arrays.
     */
    getHero(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
        tap(_ => this.log(`fetcehd hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    }

    /**
     * HttpClient.get() returns the body of the response as an untyped JSON object by default.
     * Applying the optional type specifier, <Hero[]>, adds TypeScript capabilities,
     * which reduce erros during compile time.
     * 
     * The server's data API determines the shape of the JSON data. The Tour of Heroes data API returns the hero
     * data as array
     * 
     * RxJS tap() operator, which looks at the observable values, does sometinhg with those values, and passes them along.
     * The tap() call back doesn't touch the values themselves.
     */
    getHeroes(): Observable<Hero[]> {
      return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
    }

    /**
     * The heroes web API expects a special header in HTTP save requests.
     * That header is in the httpOptions constant defined in the HeroService.
     */
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    /** PUT: update the hero on the Server
     * 
     * The HttpClient.put() method takes three parameters:
     * THE URL - is unchanged
     * the data to update(the modified hero in this case)
     * options
     */
    updateHero(hero: Hero): Observable<any> {
      return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }

    /** POST: add a new hero to the server 
     * 
     * it calls HttpClient.post() instead of put().
     * 
     * it expects the server to generate an id for the new hero, which it returns in the Observable<Hero>
     * to the caller 
     * 
     */
    addHero(hero: Hero): Observable<Hero> {
      return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
    }

    /** Log a heroservice message with the MessageService */
    private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue
     * @param operation - name of the operation that failed
     * @param result    - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error);

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result
        return of(result as T);
      }
  }
}
