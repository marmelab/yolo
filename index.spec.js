const yolo = require("./index");

describe("yolo", () => {
    const object = yolo({
        incredible: "Incredible !!!",
        nested: { prop: { work: { too: "Astonishing !!!" } } },
    });

    it("should allows to access object property normally", () => {
        expect(object.incredible).toBe("Incredible !!!");
    });

    it("should allows to access object property even when there is a typo", () => {
        expect(object.icnredible).toBe("Incredible !!!");
        expect(object.icredibl).toBe("Incredible !!!");
        expect(object.i).toBe("Incredible !!!");
    });

    it("should work for nested prop too", () => {
        expect(object.nseted.porp.wrok.to).toBe("Astonishing !!!");
    });

    it("should still return undefined if despite all effort the key was not found", () => {
        expect(object.foo).toBe(undefined);
    });
});
