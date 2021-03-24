# Yolo

Are you fed up with typos. Have you lost several hours debuggnig code, only to find out that you just mitsyped a property name.

![oh the misery](https://www.meme-arsenal.com/memes/a70d89edddba0952c58e4b11e2beafa5.jpg)

With Yolo this will never happen to you again.
Thanks to the bleednig edge technology of proxy combined, with the advanced tehcnic known as fuzzy search. Yolo correct your typo for you, by finding what you actually meant. And it does this at run time, so as to not slow down the build time.

![genius](https://memegenerator.net/img/instances/45656238.jpg)

## Usage

With yolo, you can create an object assing value to it, and now no typo can pervent you to access any value coming from that object.

```js
import yolo from "yolo";

const myObject = yolo({});

myObject.properties = {
    value: "all is good",
    method: () => ({
        result: "yeah",
    }),
};

console.log(myObject.porpeties.vlaue); // "all is good"
console.log(myObject.propreties.mehtod().reslut); // "yeah"
myObject.p.v = "still good";

console.log(myObject.propeties.value); // "still good"
```

## FAQ

### Where is the documnetation?

Yolo, is a really simple yet powerful library (if not a little dangerous), just take a lokk at the usage section and you are good to go.

### How come there is no npm pakcage, how do I install it?

I am afraid that for now you will have to clone this repsoitory. And also, you worry me.

### I use yolo, but now when I try to add a new property it update the exitsing one instead?

Indeed, if you have an object with a property like `index`, and you try to add a property named `id`.
Yolo will automatically detect `index` and update it instaed.
But this is really a small price to pay to kiss all typo goodbye.
And you have to ask yourself, do you really need that other props ?

### I tried to use yolo on a promise, but then the promise do not resolve anymore.

This is a known issue.
Sadly, builtin object like Promise, Map or Set, uses internal slot. Internal slot are like properties but reserved for internal, specification-only purposes. And when we proxy a promise the proxy lose the ability to access the slot thus breaking the object. It is possible to bind the function to the original object rather than the proxy using bind, but then we lose the benefit of yolo.

### Is this compatible wiht typescript?

Sadly no. Typescript will refuse to compile when there is a tpyo. You can have typescript, or you can have yolo. Choose wisely.
But do you still need typescript when you have yolo? Thik about it.

### Is this a joke ?

Of course it is a joke. Seriously, to avoid typo use a linter, also modern code editor offer smart code completion.

### Should I use tihs ?

Absolutely not. This is just a fun experiment with Proxy.

### Does this actually work?

Yes, it does work, except on built in object. If you are curious, feel free to take a look at the code.
