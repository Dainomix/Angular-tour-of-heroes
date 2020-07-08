import { Component, OnInit } from '@angular/core';
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  /*
   * The previous version assigns an array of heroes to the components's heroes property.
   * The assignment occurs synchronously, as if the server could return heroes instantly or
   * the browser could freeze the UI while it waited for the server's response.
   * 
   * The new version waits for the Observable to emit the array of heroes - which could happen
   * now or several minutes from now. The subscribe() method passes the emitted array to the callback,
   * which sets the component's heroes property.
   * This asynchronous approach will work when the HeroService request heroes from the server.
   */
  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
  
  /**
   * 
   * When the given name is non-blank, the handler creates a Hero-like object from the name
   * (it's only missing the id) and passes it to the services addHero() method.
   * 
   * When addHero() saves successfully, the subscribe() callback recieves the new hero and pushes it
   * into the heroes list for display
   */
  add(name: string): void {
    name = name.trim();
    if(!name) {return;}
    this.heroService.addHero({name} as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    })
  }

}
