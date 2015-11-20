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
        this.uncurrent = new angular2_1.EventEmitter();
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
    PerksPlannerTableComponent.prototype.onUnCurrentClick = function (playerPerk) {
        this.uncurrent.next(playerPerk);
    };
    PerksPlannerTableComponent = __decorate([
        angular2_1.Component({
            selector: 'perks-planner-table',
            properties: ['perks', 'name'],
            events: ['like: like', 'dislike: dislike', 'current: current', 'uncurrent: uncurrent']
        }),
        angular2_1.View({
            template: "\n    <div>\n        <h3>{{name}}</h3>\n        <ul class=\"uk-list uk-list-line\">\n           <li *ng-for=\"#playerPerk of perks\">\n           <div class=\"uk-grid\">\n                <div class=\"uk-width-2-10\">\n                    <div class=\"uk-button-group\">\n                        <a class=\"uk-button uk-button-small uk-button-success\" *ng-if=\"!playerPerk.isPreferable() && ! playerPerk.isCurrent()\" (click)=\"onLikeClick(playerPerk)\">Like</a>\n                        <a class=\"uk-button uk-button-small uk-button-danger\" *ng-if=\"! playerPerk.isCurrent() && ! playerPerk.isDislike() && ! playerPerk.isDependency()\" (click)=\"onDislikeClick(playerPerk)\">Dislike</a>\n                        <a class=\"uk-button uk-button-small uk-button-primary\" *ng-if=\"! playerPerk.isCurrent() &&  ! playerPerk.isBlocked()\" (click)=\"onCurrentClick(playerPerk)\">I have it</a>\n                        <a class=\"uk-button uk-button-small\" *ng-if=\"playerPerk.isCurrent()\" (click)=\"onUnCurrentClick(playerPerk)\">I don't have it</a>\n                    </div>\n                </div>\n                <div class=\"uk-width-8-10\"><b>{{ playerPerk.perk.name }}</b>\n                    <span class=\"uk-badge uk-badge-success\" *ng-if=\"playerPerk.isPreferable()\">desirable</span>\n                    <span class=\"uk-badge uk-badge-danger\" *ng-if=\"playerPerk.isDislike()\">dislike</span>\n                    <!--span class=\"uk-badge uk-badge-warning\" *ng-if=\"playerPerk.isBlocked()\">blocked</span-->\n                    <span class=\"uk-badge uk-badge-warning\" *ng-if=\"! playerPerk.fitRank()\">level: {{playerPerk.perk.characterLevel}}</span>\n                    <span class=\"uk-badge uk-badge-warning\" *ng-if=\"! playerPerk.fitSpecial()\"> {{playerPerk.perk.attribute}}: {{playerPerk.perk.attributeLevel}}</span>\n                    <span class=\"uk-badge uk-badge-warning\" *ng-if=\"playerPerk.isDependency()\">dependency</span>: {{ playerPerk.perk.description }}</div>\n            </div>\n           </li>\n        </ul>\n    </div>\n    ",
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        })
    ], PerksPlannerTableComponent);
    return PerksPlannerTableComponent;
})();
exports.PerksPlannerTableComponent = PerksPlannerTableComponent;
