var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
///<reference path='../../bower_components/angular2/bundles/typings/angular2/angular2.d.ts' />
var angular2_1 = require('angular2/angular2');
var BaseResource_1 = require('./BaseResource');
var http_1 = require('angular2/http');
var PerkModel = (function () {
    function PerkModel(model) {
        if (model) {
            this.id = model.id;
            this.idInternal = model.idInternal;
            this.name = model.name;
            this.rank = model.rank;
            this.attribute = model.attribute;
            this.attributeLevel = model.attributeLevel;
            this.characterLevel = model.characterLevel;
            this.description = model.description;
        }
    }
    return PerkModel;
})();
exports.PerkModel = PerkModel;
var PerkResource = (function (_super) {
    __extends(PerkResource, _super);
    function PerkResource(http) {
        _super.call(this, http);
        this.modelName = 'perk';
        this.model = function (construct) {
            return new PerkModel(construct);
        };
        this.http = http;
    }
    PerkResource = __decorate([
        angular2_1.Injectable(),
        __param(0, angular2_1.Inject(http_1.Http))
    ], PerkResource);
    return PerkResource;
})(BaseResource_1.BaseResource);
exports.PerkResource = PerkResource;
