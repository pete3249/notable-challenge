const roundToNearest15 = (date = new Date()) => {
    const minutes = 15;
    const ms = 1000 * 60 * minutes;

    return new Date(Math.round(date.getTime() / ms) * ms);
}

module.exports = roundToNearest15;