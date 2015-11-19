
var perksList  = require('./fallout.converted.json');
const userData = require('./fallout.userSettings.json');


fs = require('fs');

// fs.writeFileSync('fallout.converted.json', JSON.stringify(convertedName, null, '\t');

// var currentPerks   = [];
// var availablePerks = [];
// var desiredPerks   = [];
// var blockdPerks    = [];
// var dislikePerks   = [];

class PerkModel {
    name: string;
    rank: number;
    attribute: string;
    attributeLevel: number;
    characterLevel: number;
    description: description;
    id: string;

    constructor(model: any) {
        if (model) {
            this.id = model.id;
            this.name = model.name;
            this.rank = model.rank;
            this.attribute = model.attribute;
            this.attributeLevel = model.attributeLevel;
            this.characterLevel = model.characterLevel;
            this.description = model.description;
        }
    }
}

var perkModels = perksList.map((item) => new PerkModel(item));

class User {
    level: number;
    currentPerks: Array<PerkModel>;
    desiredPerks: Array<PerkModel>;
    dislikePerks: Array<PerkModel>;
    strength: number;
    perception: number;
    endurance: number;
    charisma: number;
    intelligence: number;
    agility: number;
    luck: number;
}

class UserPerk {
    perk: PerkModel;
    user: User;

    current: boolean;
    desired: boolean;
    blocked: boolean;
    dislike: boolean;

    constructor(perk, user) {
        this.perk = perk;
        this.user = user;
    }

    isAvailble () {
        if (this.isCurrent()) {
            return false;
        }
        // Fit SPECIAL
        // Fit Rank
        // not desired or Required for desired
        return true;
    }

    isBlocked () {
        if (this.isCurrent()) {
            return false;
        }
        // Not SPECIAL Or Not Fit Rank
        // not desired or Required for desired
        return true;
    }

    isCurrent () {
        // Is current
        return false;
     //   return user.hasPerk(this.perk);
    }

    isDislike () {
        if (this.isCurrent()) {
            return false;
        }

        // dislike and not required for desired
        return false;
        // return user.hasPerk(this.perk);
    }
}

class SortedPerks {
    currentPerks: Array<PerkModel>;
    availablePerks: Array<PerkModel>;
    blockedPerks: Array<PerkModel>;
    dislikePerks: Array<PerkModel>;

    constructor() {
        this.currentPerks = [];
        this.availablePerks = [];
        this.blockedPerks = [];
        this.dislikePerks = [];
    }
}

var sortedPerks = new SortedPerks();

perkModels.forEach(perk => {
    var userPerk = new UserPerk(perk, userData);

    if (userPerk.isCurrent()) {
        sortedPerks.currentPerks.push(userPerk);
    }

    if (userPerk.isAvailble()) {
        sortedPerks.availablePerks.push(userPerk);
    }

    if (userPerk.isBlocked()) {
        sortedPerks.blockedPerks.push(userPerk);
    }

    if (userPerk.isDislike()) {
        sortedPerks.dislikePerks.push(userPerk);
    }
});

console.log('------------------------------------------------------------------');
console.log('--------------------AVAILABLE------------------------');
console.log('------------------------------------------------------------------');

sortedPerks.availablePerks.forEach(item => {
    console.log(item.perk.name);
});

console.log('------------------------------------------------------------------');
console.log('--------------------BLOCKED------------------------');
console.log('------------------------------------------------------------------');

sortedPerks.blockedPerks.forEach(item => {
    console.log(item.perk.name);
});

module.exports = function () {};
