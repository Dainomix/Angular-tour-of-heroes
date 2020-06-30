import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HeroesComponent } from "./heroes/heroes.component";

/**
 * ng generate module app-routing --flat --module=app
 * the module class nmae is AppRoutingModule
 * it belongs in the app-routing.module.ts in src/app folder
 * 
 * --flat: puts the file in src/app instaedof its own file
 * --module=app tells the CLI to register it in the imports array of the AppModule
 */


/**
 * 1. imports RouterModule and Routes
 * 2. imports HeroesComponent: will give the Router somewhere to go once you configure the routes.
 * 
 * Routes tell the Router which view to display when a user clicks a link or pastes a URL into the browser address bar
 * Since ApppRoutingModule already imports HeroesComponent, we can use it in the routes array
 */
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent}
]
/**
 * path: a string that matches the URL in the browser address bar
 * component: the component that the router should create when navigating to this route
 */

/**
 * The @NgModule metadata initiallizes the router and starts it listening for browser location changes.
 * the following line adds the RouterModule to the AppRoutingModule imports array and configures it with 
 * the routes in one step by calling RouterModule.forRoot():
 * 
 * - The method is called forRoot() beacuse we configure the router at the application's root level.
 * The forRoot() method supplies the service providers and directives needed for routing, and performs
 * the initial navigation based on the current browser URL. 
 * 
 * Next, AppRoutingModule exports routerMdoule so it will be available throughout the app.
 */
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
