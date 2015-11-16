///<reference path='../bower_components/angular2/bundles/typings/angular2/angular2.d.ts' />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var HomeController_1 = require('./controllers/HomeController');
var PerksPlannerController_1 = require('./controllers/PerksPlannerController');
var App = (function () {
    function App() {
    }
    App = __decorate([
        router_1.RouteConfig([
            { path: '/', as: 'HomeController', component: HomeController_1.HomeController },
            { path: '/perks', as: 'PerksPlannerController', component: PerksPlannerController_1.PerksPlannerController }
        ]),
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            templateUrl: 'views/app.html',
            directives: [[router_1.ROUTER_DIRECTIVES]]
        })
    ], App);
    return App;
})();
exports.App = App;
