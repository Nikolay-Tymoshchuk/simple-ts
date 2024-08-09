interface User {
  name: string;
  email: string;
  login: string;
}

interface Admin {
  name: string;
  role: number;
}

const user: User = {
  name: "Alex",
  email: "alex@gmail.com",
  login: "alex",
};

function login(id: string | number) {
  if (isString(id)) {
    console.log("id", id);
  } else {
    alert("id is not a string");
  }
}
//Простой тайпгард
function isString(x: string | number): x is string {
  return typeof x === "string";
}

//
function isAdmin(user: User | Admin): user is Admin {
  return "role" in user;
}
function isAdminAlternative(user: User | Admin): user is Admin {
  return (user as Admin).role !== undefined;
}

function setRoleToZero(user: User | Admin) {
  if (isAdmin(user)) {
    user.role = 0;
  } else {
    throw new Error("User is not an admin");
  }
}

// =================================== type guard example ======================

interface IPayment {
  sum: number;
  from: number;
  to: number;
}

enum PaymentStatus {
  Failed = "failed",
  Success = "success",
}

interface IPaymentRequest extends IPayment {}

interface IDataSuccess {
  databaseId: number;
  sum: number;
  from: number;
  to: number;
}

interface IDataFailed {
  errorMessage: string;
  errorCode: number;
}

interface IResponSeSuccess {
  status: PaymentStatus.Success;
  data: IDataSuccess;
}

interface IResponSeFailed {
  status: PaymentStatus.Failed;
  data: IDataFailed;
}

type Res = IResponSeSuccess | IResponSeFailed;

type f = (res: Res) => number;

//typeGuard
function isSuccess(res: Res): res is IResponSeSuccess {
  return res.status === PaymentStatus.Success;
}

function getIdFromData(res: Res): number {
  if (isSuccess(res)) {
    return res.data.sum;
  } else {
    throw new Error(res.data.errorMessage);
  }
}

// LABEL: Asserts

const a = {};

assertUser(a);
a.name = "Alex";

function assertUser(obj: unknown): asserts obj is User {
  if (typeof obj === "object" && !!obj && "name" in obj) {
    return;
  }
  throw new Error("Object is not a User");
}
