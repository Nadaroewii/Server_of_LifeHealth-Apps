function getBinarySize(string) {
    return Buffer.byteLength(string, 'utf8');
}

module.exports = {
    getBinarySize
}