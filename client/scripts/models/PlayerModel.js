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
var PlayerModel = (function () {
    function PlayerModel(modelData) {
        this.level = 0;
        this.currentPerks = [];
        this.desiredPerks = [];
        this.dislikePerks = [];
        this.strength = 0;
        this.perception = 0;
        this.endurance = 0;
        this.charisma = 0;
        this.intelligence = 0;
        this.agility = 0;
        this.luck = 0;
        this.setData(modelData);
    }
    PlayerModel.prototype.setData = function (modelData) {
        if (modelData) {
            this.level = modelData.level;
            this.currentPerks = modelData.currentPerks;
            this.desiredPerks = modelData.desiredPerks;
            this.dislikePerks = modelData.dislikePerks;
            this.strength = modelData.strength;
            this.perception = modelData.perception;
            this.endurance = modelData.endurance;
            this.charisma = modelData.charisma;
            this.intelligence = modelData.intelligence;
            this.agility = modelData.agility;
            this.luck = modelData.luck;
            this.userId = modelData.userId;
            this.id = modelData.id;
        }
    };
    return PlayerModel;
})();
exports.PlayerModel = PlayerModel;
var CurrentPlayerModel = (function (_super) {
    __extends(CurrentPlayerModel, _super);
    function CurrentPlayerModel() {
        _super.call(this);
        this.callBackList = [];
    }
    CurrentPlayerModel.prototype.onChanges = function (callback) {
        this.callBackList.push(callback);
    };
    CurrentPlayerModel.prototype.updated = function () {
        this.callBackList.forEach(function (callback) { return callback(true); });
    };
    CurrentPlayerModel.prototype.dislike = function (perk) {
        var _this = this;
        this.dislikePerks.push(perk);
        this.currentPerks.forEach(function (item, index) {
            if (item.id === perk.id) {
                _this.currentPerks.splice(index, 1);
            }
        });
        this.desiredPerks.forEach(function (item, index) {
            if (item.id === perk.id) {
                _this.desiredPerks.splice(index, 1);
            }
        });
        this.updated();
    };
    CurrentPlayerModel.prototype.like = function (perk) {
        var _this = this;
        this.desiredPerks.push(perk);
        this.currentPerks.forEach(function (item, index) {
            if (item.id === perk.id) {
                _this.currentPerks.splice(index, 1);
            }
        });
        this.dislikePerks.forEach(function (item, index) {
            if (item.id === perk.id) {
                _this.dislikePerks.splice(index, 1);
            }
        });
        this.updated();
    };
    CurrentPlayerModel.prototype.current = function (perk) {
        var _this = this;
        this.currentPerks.push(perk);
        this.desiredPerks.forEach(function (item, index) {
            if (item.id === perk.id) {
                _this.desiredPerks.splice(index, 1);
            }
        });
        this.dislikePerks.forEach(function (item, index) {
            if (item.id === perk.id) {
                _this.dislikePerks.splice(index, 1);
            }
        });
        this.updated();
    };
    CurrentPlayerModel.prototype.uncurrent = function (perk) {
        var _this = this;
        this.currentPerks.forEach(function (item, index) {
            if (item.id === perk.id) {
                _this.currentPerks.splice(index, 1);
            }
        });
        this.updated();
    };
    CurrentPlayerModel = __decorate([
        angular2_1.Injectable()
    ], CurrentPlayerModel);
    return CurrentPlayerModel;
})(PlayerModel);
exports.CurrentPlayerModel = CurrentPlayerModel;
var PlayerResource = (function (_super) {
    __extends(PlayerResource, _super);
    function PlayerResource(http) {
        _super.call(this, http);
        this.modelName = 'player';
        this.model = function (construct) {
            return new PlayerModel(construct);
        };
        this.http = http;
    }
    PlayerResource = __decorate([
        angular2_1.Injectable(),
        __param(0, angular2_1.Inject(http_1.Http))
    ], PlayerResource);
    return PlayerResource;
})(BaseResource_1.BaseResource);
exports.PlayerResource = PlayerResource;
