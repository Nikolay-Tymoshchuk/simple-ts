let a = 5;
let b: string = a.toString();
let e: string = new String(a).valueOf();
let f: boolean = new Boolean(a).valueOf();

let c = "c";
let d: number = parseInt(c);

interface User {
  name: string;
  email: string;
  login: string;
}

const user: User = {
  name: "Alex",
  email: "alex@gmail.com",
  login: "alex",
};
const user1 = {
  name: "Alex",
  email: "alex@gmail.com",
  login: "alex",
} as User;

const user3 = <User>{
  name: "Alex",
  email: "alex@gmail.com",
  login: "alex",
}; // Type assertion (not for react coz of JSX)

interface Admin {
  name: string;
  role: number;
}

//Мы сохранили ненужные свойства юзера
const admin: Admin = {
  ...user,
  role: 1,
};

/**
 * Функция мапинга
 * Удобно, потому что если мы для админа хотим сделать свойство name,
 * которое будет равно свойству login юзера, то мы можем сделать это
 * в одном месте (в этой функции)
 */

function mapUserToAdmin(user: User): Admin {
  return {
    name: user.name,
    role: 1,
  };
}
