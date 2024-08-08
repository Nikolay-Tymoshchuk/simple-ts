namespace guardAssert {
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
}
