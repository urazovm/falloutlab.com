///<reference path="../../bower_components/angular2/angular2.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2/angular2');
var PerksPlannerTableComponent = (function () {
    function PerksPlannerTableComponent() {
        this.like = new angular2_1.EventEmitter();
        this.dislike = new angular2_1.EventEmitter();
        this.current = new angular2_1.EventEmitter();
    }
    PerksPlannerTableComponent.prototype.onLikeClick = function (playerPerk) {
        this.like.next(playerPerk);
    };
    PerksPlannerTableComponent.prototype.onDislikeClick = function (playerPerk) {
        this.dislike.next(playerPerk);
    };
    PerksPlannerTableComponent.prototype.onCurrentClick = function (playerPerk) {
        this.current.next(playerPerk);
    };
    PerksPlannerTableComponent = __decorate([
        angular2_1.Component({
            selector: 'perks-planner-table',
            properties: ['perks', 'name'],
            events: ['like: like', 'dislike: dislike', 'current: current']
        }),
        angular2_1.View({
            template: "\n    <div>\n        <h4>{{name}}</h4>\n        <ul class=\"uk-list\">\n           <li *ng-for=\"#playerPerk of perks\">\n           <div class=\"uk-grid\">\n                <div class=\"uk-width-2-10\">\n                    <div *ng-if=\"playerPerk.isPreferable()\">desirable</div>\n                    <div *ng-if=\"playerPerk.isDislike()\">dislike</div>\n                    <div *ng-if=\"playerPerk.isBlocked()\">blocked</div>\n                    <div *ng-if=\"playerPerk.isDependency()\">dependency</div>\n                    <div>  <a *ng-if=\"! playerPerk.isPreferable()\" (click)=\"onLikeClick(playerPerk)\">Like</a>\n                    <a *ng-if=\"! playerPerk.isDislike()\" (click)=\"onDislikeClick(playerPerk)\">Dislike</a>\n                    <a *ng-if=\"! playerPerk.isCurrent()\" (click)=\"onCurrentClick(playerPerk)\">I have it</a>\n                    <a *ng-if=\"! playerPerk.isDislike()\" (click)=\"onUnCurrentClick(playerPerk)\">I don't have it</a></div>\n\n                </div>\n                <div class=\"uk-width-8-10\"><i>{{ playerPerk.perk.name }}</i><br/>{{ playerPerk.perk.description }}</div>\n            </div>\n           </li>\n        </ul>\n    </div>\n    ",
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        })
    ], PerksPlannerTableComponent);
    return PerksPlannerTableComponent;
})();
exports.PerksPlannerTableComponent = PerksPlannerTableComponent;
