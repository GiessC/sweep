const generateVersion = () => {
    const now = new Date();
    return dateToVersion(now);
};

const dateToVersion = (date) => {
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${year}.${month}.${day}-${hours}${minutes}${seconds}`;
};

const padZero = (value) => {
    return value.toString().padStart(2, '0');
};

module.exports = {
    generateVersion,
};
