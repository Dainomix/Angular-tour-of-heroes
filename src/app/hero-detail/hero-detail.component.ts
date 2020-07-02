import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  /**
   * 
   * @param activatedRoute holds information about the route to this instance of the HeroDetailComponent.
   * This component is interested in the route's parameters extractedfrom the URL.
   * The "id" parameter is the id of the hero to display
   * @param location is an Angular service for interacting with the browser.
   * we will use it later to navigate back to the view that navigated here.
   * @param heroService gets hero data from the remote server and this component will use it to ge the hero-to-display
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private location:Location,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  /**
   * The route.snapshot is a static image of route information shortly after the component was created.
   * 
   * The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns
   * the id of the hero to fetch
   * 
   * Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is
   * what a hero id should be.
   */
  getHero(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
