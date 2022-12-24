const { Transform } = require("stream");

const lockTransform = (offset) => {
    return switcher(offset);
}
const unlockTransform = (offset) => {
    return switcher(offset * -1);
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

exports.lockTransform = lockTransform;
exports.unlockTransform = unlockTransform;
exports.switcher = switcher;