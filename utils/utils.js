export default class Utils {
     getRandomObjectKey(object) {
        const randIndex = Math.floor(Math.random()*Object.keys(object).length);
        return Object.keys(object)[randIndex];
    }

     getRandomArrayElement(array) {
        const randIndex = Math.floor(Math.random() * array.length);
        return array[randIndex]
    }

    getRandomIndex(max) {
        return Math.floor(Math.random() * max)
    }
}