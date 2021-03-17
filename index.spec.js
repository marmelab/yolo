const yolo = require("./index");

describe("yolo", () => {
    let object;
    beforeEach(() => {
        object = yolo({
            incredible: "Incredible !!!",
            nested: { prop: { work: { too: "Astonishing !!!" } } },
            method: () => "Is there no limit ?",
            getObject: () => ({
                surelyThisWillNotWork: "You bet it does",
            }),
        });
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

    it("should work for method", () => {
        expect(object.mehtod()).toBe("Is there no limit ?");
    });

    it("should work for returned value", () => {
        expect(object.gtObjct().srelyThisWillNotWork).toBe("You bet it does");
    });

    it("should allow to assign value with typo too", () => {
        object.icnredible = "It is correctly updated ?!?";
        object.nseted.popr.wrko.oto = "Even nested wtf";
        expect(object.icnredible).toBe("It is correctly updated ?!?");
        expect(object.incredible).toBe("It is correctly updated ?!?");
        expect(object.netsed.prpo.owrk.oot).toBe("Even nested wtf");
        expect(object.nested.prop.work.too).toBe("Even nested wtf");
        expect(object).toEqual({
            getObject: object.getObject,
            incredible: "It is correctly updated ?!?",
            method: object.method,
            nested: {
                prop: {
                    work: {
                        too: "Even nested wtf",
                    },
                },
            },
        });
    });

    it("should allow to still assign new prop, and yolo them too", () => {
        const object = yolo({});
        expect(object).toEqual({});
        object.foo = "bar";
        expect(object).toEqual({ foo: "bar" });
        expect(object.fo).toBe("bar");
        object.ofo = { bar: "baz" };
        expect(object.ofo.bra).toBe("baz");
        expect(object).toEqual({ foo: { bar: "baz" } });
    });

    it("should still return undefined if despite all effort the key was not found", () => {
        expect(object.foo).toBe(undefined);
    });
});
