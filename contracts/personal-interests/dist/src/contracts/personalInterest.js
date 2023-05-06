"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeInterest = exports.PersonalInterest = exports.bsv = exports.SensiletSigner = exports.DefaultProvider = void 0;
const scrypt_ts_1 = require("scrypt-ts");
Object.defineProperty(exports, "DefaultProvider", { enumerable: true, get: function () { return scrypt_ts_1.DefaultProvider; } });
Object.defineProperty(exports, "SensiletSigner", { enumerable: true, get: function () { return scrypt_ts_1.SensiletSigner; } });
Object.defineProperty(exports, "bsv", { enumerable: true, get: function () { return scrypt_ts_1.bsv; } });
class PersonalInterest extends scrypt_ts_1.SmartContract {
    constructor(topic, owner, weight = 1n) {
        super(...arguments);
        this.topic = topic;
        this.owner = owner;
        this.weight = weight;
    }
    static build({ topic, playerPublicKey, weight }) {
        return new this((0, scrypt_ts_1.toByteString)(topic, true), (0, scrypt_ts_1.PubKey)(playerPublicKey), weight);
    }
    setValue(signature) {
        (0, scrypt_ts_1.assert)(this.checkSig(signature, this.owner), `checkSig failed, pubkey: ${this.owner}`);
    }
    setWeight(weight, signature) {
        this.weight = weight;
        (0, scrypt_ts_1.assert)(this.checkSig(signature, this.owner), `checkSig failed, pubkey: ${this.owner}`);
    }
    remove(signature) {
        (0, scrypt_ts_1.assert)(this.checkSig(signature, this.owner), `checkSig failed, pubkey: ${this.owner}`);
    }
}
__decorate([
    (0, scrypt_ts_1.prop)()
], PersonalInterest.prototype, "owner", void 0);
__decorate([
    (0, scrypt_ts_1.prop)()
], PersonalInterest.prototype, "topic", void 0);
__decorate([
    (0, scrypt_ts_1.prop)(true)
], PersonalInterest.prototype, "weight", void 0);
__decorate([
    (0, scrypt_ts_1.method)()
], PersonalInterest.prototype, "setValue", null);
__decorate([
    (0, scrypt_ts_1.method)()
], PersonalInterest.prototype, "setWeight", null);
__decorate([
    (0, scrypt_ts_1.method)()
], PersonalInterest.prototype, "remove", null);
exports.PersonalInterest = PersonalInterest;
async function removeInterest(instance, publickey, address) {
    const result = await instance.methods.remove((sigResps) => {
        return (0, scrypt_ts_1.findSig)(sigResps, new scrypt_ts_1.bsv.PublicKey(publickey));
    }, {
        pubKeyOrAddrToSign: new scrypt_ts_1.bsv.PublicKey(publickey).toAddress()
    });
    return result;
}
exports.removeInterest = removeInterest;
//# sourceMappingURL=personalInterest.js.map