"use strict";
// Необходимо написать функцию группировки, которая принимает массив объектов
// и его ключ, производит группировку по указанному ключу и возращает
// сгруппированный объект.
// Пример:
// ``` js
// [
// 	{ group: 1, name: 'a' },
// 	{ group: 1, name: 'b' },
// 	{ group: 2, name: 'c' },
// ];
// ```
Object.defineProperty(exports, "__esModule", { value: true });
// При группироке по 'group' ---->
// ``` js
// {
// 	'1': [ { group: 1, name: 'a' }, { group: 1, name: 'b' } ],
// 	'2': [ { group: 2, name: 'c' } ]
// }
// ```
// interface PaymentPersistent {
//   id: number;
//   sum: number;
//   from: string;
//   to: string;
// }
// type Payment = Omit<PaymentPersistent, "id">;
// type PaymentRequisits = Pick<PaymentPersistent, "from" | "to">;
// type ExtractEx = Extract<"from" | "to" | Payment, string>;
// type ExcludeEx = Exclude<"from" | "to" | Payment, string>;
function getClassroomAverage(students, allScores) {
    const studentScores = students
        .map((student) => allScores.get(student))
        .filter((score) => score !== undefined);
    console.log("<==studentScores==>", studentScores);
    return studentScores.reduce((a, b) => a + b) / studentScores.length; // ok!
}
const students = ["Alice", "Bob", "Charlie", "Ben", "Daisy", "Eva", "Frank"];
const scores = new Map([
    ["Alice", 100],
    ["Bob", 90],
    ["Charlie", 80],
    ["Ben", 70],
    ["Daisy", 60],
    ["Eva", 50],
    ["Frank", 40],
]);
console.log(getClassroomAverage(students, scores)); // 70
const nums = [1, 2, 3, null, 5].filter((x) => x !== null);
nums.push(null);
console.log("nums", nums);
