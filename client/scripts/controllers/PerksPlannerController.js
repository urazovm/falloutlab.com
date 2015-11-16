///<reference path="../../bower_components/angular2/bundles/typings/angular2/angular2.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2/angular2');
var PerksPlannerComponent_1 = require('../components/PerksPlannerComponent');
var PerksPlannerController = (function () {
    function PerksPlannerController() {
    }
    PerksPlannerController = __decorate([
        angular2_1.Component({}),
        angular2_1.View({
            template: "\n        <div>\n            <perks-planner />\n        </div>\n    ",
            directives: [PerksPlannerComponent_1.PerksPlannerComponent]
        })
    ], PerksPlannerController);
    return PerksPlannerController;
})();
exports.PerksPlannerController = PerksPlannerController;
