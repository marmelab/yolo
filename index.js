const Fuse = require("fuse.js");

const getAllProperties = (obj) => {
    var allProps = [],
        curr = obj;
    do {
        var props = Object.getOwnPropertyNames(curr);
        props.forEach(function (prop) {
            if (allProps.indexOf(prop) === -1) allProps.push(prop);
        });
    } while ((curr = Object.getPrototypeOf(curr)));
    return allProps;
};

const yolo = (target) => {
    if (
        (typeof target !== "object" || target === null) &&
        typeof target !== "function"
    ) {
        return target;
    }
    return new Proxy(target, {
        get: function (target, prop) {
            if (target[prop]) {
                const result = Reflect.get(target, prop);
                return result && result.bind ? result.bind(target) : result;
            }
            const keys = getAllProperties(target);
            var results = new Fuse(keys).search(prop);
            if (!results.length) {
                const result = Reflect.get(target, prop);
                return result && result.bind ? result.bind(target) : result;
            }
            const value = Reflect.get(target, results[0].item);

            const boundValue = value && value.bind ? value.bind(target) : value;

            return yolo(boundValue);
        },
        set: function (target, prop, value) {
            if (target[prop]) {
                return Reflect.set(target, prop, value);
            }
            const keys = Object.keys(target);
            var results = new Fuse(keys).search(prop);
            if (!results.length) {
                return Reflect.set(target, prop, value);
            }

            return Reflect.set(target, results[0].item, value);
        },
        apply: function (target, thisArg, argumentsList) {
            const result = Reflect.apply(target, thisArg, argumentsList);

            return yolo(result);
        },
        construct: function (target, argumentsList) {
            const result = Reflect.construct(target, argumentsList);

            return typeof result === "object" && result !== null
                ? yolo(result)
                : result;
        },
    });
};

module.exports = yolo;
