const compose = (...fns) => (...args) => fns.reduceRight((val, fn) => fn.apply(null, [].concat(val)), args);

const f = x => x + 1;
const g = x => x * 2;
const t = (x, y) => x + y;
const log = x => {
    console.log(x)
    return x
};

let fgt = compose(log, f, g, t);
fgt(1, 2) // 3 -> 6 -> 7