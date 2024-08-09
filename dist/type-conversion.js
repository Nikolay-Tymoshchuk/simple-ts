"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let a = 5;
let b = a.toString();
let e = new String(a).valueOf();
let f = new Boolean(a).valueOf();
let c = "c";
let d = parseInt(c);
const user = {
    name: "Alex",
    email: "alex@gmail.com",
    login: "alex",
};
const user1 = {
    name: "Alex",
    email: "alex@gmail.com",
    login: "alex",
};
const user3 = {
    name: "Alex",
    email: "alex@gmail.com",
    login: "alex",
}; // Type assertion (not for react coz of JSX)
//Мы сохранили ненужные свойства юзера
const admin = Object.assign(Object.assign({}, user), { role: 1 });
/**
 * Функция мапинга
 * Удобно, потому что если мы для админа хотим сделать свойство name,
 * которое будет равно свойству login юзера, то мы можем сделать это
 * в одном месте (в этой функции)
 */
function mapUserToAdmin(user) {
    return {
        name: user.name,
        role: 1,
    };
}
