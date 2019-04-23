const dollar = 27.5;
const samsung = 700 * dollar;
const xiaomi = 600 * dollar;

const Samsung = document.getElementById('samsung');
const Xiaomi = document.getElementById('xiaomi');
const answer = document.getElementById('answer');

if (dollar > 26 || dollar === 26) {
    Samsung.innerHTML = samsung;
    Xiaomi.innerHTML = xiaomi;
} else {
    document.getElementById('app').style.display = 'none';
    answer.innerHTML = 'Нет товаров';
}


class People {
    constructor(name) {
        this.name = name;
    }
}
