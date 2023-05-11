const { Transform } = require("stream");

const lockTransform = (offset) => {
    return switcher(offset);
}
const unlockTransform = (offset) => {
    return switcher(offset * -1);
}
const lock = (string, offset) => {
    return flipper(string, offset);
}
const unlock = (string, offset) => {
    return flipper(string, offset * -1);
}
const switcher = (offset) => {
    return new Transform({
        transform(chunk, encoding, callback) {
            let pendingArray = [];
            for (const value of chunk.values()) {
                pendingArray.push(value + offset);
                if (typeof value != 'number') {
                    console.log('Not a number');
                }
            }
            let chunkBuffer = Buffer.from(pendingArray);

            callback(null, chunkBuffer);
        },
    });
}
const flipper = (string, offset) => {

    let pendingArray = [];
    let buff = Buffer.from(string);
    for (const value of buff.values()) {
        pendingArray.push(value + offset);
        if (typeof value != 'number') {
            console.log('Not a number');
        }
    }
    let chunkBuffer = Buffer.from(pendingArray);
    return chunkBuffer.toString();

};
exports.lockTransform = lockTransform;
exports.unlockTransform = unlockTransform;
exports.switcher = switcher;

exports.lock = lock;
exports.unlock = unlock;
exports.flipper = flipper;