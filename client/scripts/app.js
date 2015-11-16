///<reference path='../bower_components/angular2/bundles/typings/angular2/angular2.d.ts' />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var HomeController_1 = require('./controllers/HomeController');
var PerksPlannerController_1 = require('./controllers/PerksPlannerController');
var PlayerModel_1 = require('./models/PlayerModel');
var PlayerStatsComponent_1 = require('./components/PlayerStatsComponent');
var App = (function () {
    function App(currentPlayerModel) {
        this.playerModel = currentPlayerModel;
    }
    App = __decorate([
        router_1.RouteConfig([
            { path: '/', as: 'HomeController', component: HomeController_1.HomeController },
            { path: '/perks', as: 'PerksPlannerController', component: PerksPlannerController_1.PerksPlannerController }
        ]),
        angular2_1.Component({
            selector: 'my-app',
            providers: [PlayerStatsComponent_1.PlayerStatsComponent, PlayerModel_1.CurrentPlayerModel]
        }),
        angular2_1.View({
            templateUrl: 'views/app.html',
            directives: [[router_1.ROUTER_DIRECTIVES], PlayerStatsComponent_1.PlayerStatsComponent]
        }),
        __param(0, angular2_1.Inject(PlayerModel_1.CurrentPlayerModel))
    ], App);
    return App;
})();
exports.App = App;
