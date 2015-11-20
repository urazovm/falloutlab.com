///<reference path='../bower_components/angular2/bundles/typings/angular2/angular2.d.ts' />

import {Component, View, Inject} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeController}         from './controllers/HomeController';
import {PerksPlannerController} from './controllers/PerksPlannerController';
import {PlayerModel, CurrentPlayerModel, PlayerResource} from './models/PlayerModel';
import {PlayerStatsComponent}   from './components/PlayerStatsComponent';


@RouteConfig([
    { path: '/', as: 'HomeController', component: HomeController },
    { path: '/perks', as: 'PerksPlannerController', component: PerksPlannerController }
])

@Component({
  selector: 'my-app',
  providers: [PlayerStatsComponent, CurrentPlayerModel, PlayerResource]
})

@View({
    templateUrl: 'views/app.html',
    directives: [[ROUTER_DIRECTIVES], PlayerStatsComponent]
})

export class App {
    playerModel: PlayerModel;
    playerResource: PlayerResource;

    constructor( @Inject(CurrentPlayerModel) currentPlayerModel: CurrentPlayerModel, @Inject(PlayerResource) playerResource: PlayerResource) {
        this.playerModel = currentPlayerModel;
        this.playerResource = playerResource;

        // var fromLocalStorage = localStorage.getItem('currentPlayer');
        var fromLocalStorageId = localStorage.getItem('currentPlayerId');

        // console.log('ID', fromLocalStorageId);

        // if (fromLocalStorage) {
        //     this.playerModel.setData(JSON.parse(fromLocalStorage));
        // }

        if (fromLocalStorageId) {
            this.loadByEmail(JSON.parse(fromLocalStorageId))
                .then(record => {
                    this.playerModel.setData(record);
                }).catch(err => {
                    console.log(err);
                });
        }

        this.playerModel.onChanges(() => {
            if (! this.playerModel.userId) {
                return;
            }

            if (this.playerModel.id) {
                this.playerResource.upsert(this.playerModel)
                    .then((record: CurrentPlayerModel) => {
                        console.log(record);
                        this.playerModel.setData(record);
                        console.log('HHH', JSON.stringify(record.id));
                        localStorage.setItem('currentPlayerId', JSON.stringify(record.userId));
                    });
            } else {
                this.loadByEmail(this.playerModel.userId)
                    .then(record => {
                        if (record) {
                            localStorage.setItem('currentPlayerId', JSON.stringify(record.userId));
                            this.playerModel.setData(record);
                        } else {
                            this.playerResource.upsert(this.playerModel)
                                .then((record: CurrentPlayerModel) => {
                                    console.log(record);
                                    this.playerModel.setData(record);
                                    console.log('HHH', JSON.stringify(record.id));
                                    localStorage.setItem('currentPlayerId', JSON.stringify(record.userId));
                                });
                        }
                    }).catch(err => {
                        console.log(err);
                    });
            }
            // if (this.playerModel.userId) {
            //     this.playerResource.find({
            //         where: {
            //             userId: JSON.parse(fromLocalStorageId)
            //         }
            //     }).then((record: Array<CurrentPlayerModel>) => {
            //         if (record[0].id) {
            //             this.playerModel.setData(record[0]);
            //         }
            //     }).then(user)
                // this.playerResource.upsert(this.playerModel)
                //     .then((record: CurrentPlayerModel) => {
                //         console.log(record);
                //         this.playerModel.setData(record);
                //         console.log('HHH', JSON.stringify(record.id));
                //         localStorage.setItem('currentPlayerId', JSON.stringify(record.userId));
                //     });
//            }
//            localStorage.setItem('currentPlayer', JSON.stringify(this.playerModel));
        });

        this.playerModel = currentPlayerModel;
    }

    loadByEmail (email: string) {
        return this.playerResource.find({
            where: {
                userId: email
            }
        }).then((record: Array<CurrentPlayerModel>) => {
            if (record[0].id) {
                return record[0];
            }
        });
    }
}
