"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvePlattform = void 0;
function ResolvePlattform(plattform) {
    const Plattform = require(`./${plattform}`);
    if (plattform) {
        return new Plattform();
    }
    return null;
}
exports.ResolvePlattform = ResolvePlattform;
//# sourceMappingURL=index.js.map