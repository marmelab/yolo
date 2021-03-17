const Fuse = require("fuse.js");

const yolo = (target) => {
    return new Proxy(target, {
        get: function (target, prop) {
            if (target.hasOwnProperty(prop)) {
                return Reflect.get(...arguments);
            }
            const keys = Object.keys(target);
            var results = new Fuse(keys).search(prop);
            if (!results.length) {
                return Reflect.get(...arguments);
            }

            return target[results[0].item];
        },
    });
};

module.exports = yolo;
