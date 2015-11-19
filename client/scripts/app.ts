///<reference path='../bower_components/angular2/bundles/typings/angular2/angular2.d.ts' />

import {Component, View, Inject} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeController}         from './controllers/HomeController';
import {PerksPlannerController} from './controllers/PerksPlannerController';
import {PlayerModel, CurrentPlayerModel} from './models/PlayerModel';
import {PlayerStatsComponent}   from './components/PlayerStatsComponent';


@RouteConfig([
    { path: '/', as: 'HomeController', component: HomeController },
    { path: '/perks', as: 'PerksPlannerController', component: PerksPlannerController }
])

@Component({
  selector: 'my-app',
  providers: [PlayerStatsComponent, CurrentPlayerModel]
})

@View({
    templateUrl: 'views/app.html',
    directives: [[ROUTER_DIRECTIVES], PlayerStatsComponent]
})

export class App {
    playerModel: PlayerModel;

    constructor(@Inject(CurrentPlayerModel) currentPlayerModel: CurrentPlayerModel) {
        this.playerModel = currentPlayerModel;
    }
}
