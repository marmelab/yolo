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
        object.nseted.popr.wrko.to = "Even nested wtf";
        expect(object.incredible).toBe("It is correctly updated ?!?");
        expect(object.netsed.prpo.owrk.oot).toBe("Even nested wtf");
        expect(object.nested.prop.work.too).toBe("Even nested wtf");
        expect(object.icnredible).toBe("It is correctly updated ?!?");
        expect(object.nested).toEqual({
            prop: {
                work: {
                    too: "Even nested wtf",
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
        object.fo = { bar: "baz" };
        expect(object.ofo.bra).toBe("baz");
        expect(object).toEqual({ foo: { bar: "baz" } });
    });

    it("should still return undefined if despite all effort the key was not found", () => {
        expect(object.foobar).toBe(undefined);
    });

    it("should work with date", () => {
        const YoloDate = yolo(Date);
        const date = new YoloDate();
        expect(date.getSecnds()).toEqual(date.getSeconds());
    });

    it("should apply yolo to function argument", () => {
        const fn = yolo((arg) => arg.icredible);
        expect(fn({ incredible: "incredible" })).toBe("incredible");
    });

    it("should apply yolo to function callback argument", (done) => {
        const fn = yolo((cb) => cb({ incredible: "incredible" }));
        fn((result) => {
            try {
                expect(result.icredible).toBe("incredible");
                done();
            } catch (error) {
                done(error);
            }
        });
    });

    it("should apply yolo to constructor argument", () => {
        const Constructor = yolo(function (arg) {
            this.arg = arg;
            return this;
        });
        const object = new Constructor({ incredible: "incredible" });
        expect(object.ag.icredble).toEqual("incredible");
        expect(object.ag).toEqual({ incredible: "incredible" });
    });

    it("should apply yolo to constructor callback result", () => {
        const Constructor = yolo(function (cb) {
            this.cb = cb;
            return this;
        });
        const object = new Constructor(() => ({ incredible: "incredible" }));
        expect(object.cb()).toEqual({ incredible: "incredible" });
        expect(object.cb().incredible).toEqual("incredible");
        expect(object.cb().icredble).toEqual("incredible");
    });
});
