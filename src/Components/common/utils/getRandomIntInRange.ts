const getRandomIntInRange = (min = 0, max = 0) => {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);

    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

export default getRandomIntInRange;