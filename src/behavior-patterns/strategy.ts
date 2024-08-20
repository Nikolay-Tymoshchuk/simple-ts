//Strategy pattern

class User {
  githubToken: string;
  jwtToken: string;
}

interface AuthStrategy {
  auth(user: User): boolean;
}

/**
 * Класс, который использует стратегии
 */
class Auth {
  constructor(private strategy: AuthStrategy) {}

  setStrategy(strategy: AuthStrategy) {
    this.strategy = strategy;
  }

  public authUser(user: User): boolean {
    return this.strategy.auth(user);
  }
}

/**
 * Конкретные стратегии
 */
class JWTStrategy implements AuthStrategy {
  auth(user: User): boolean {
    if (user.jwtToken) {
      console.log("JWT auth success");
      return true;
    }
    console.log("JWT auth failed");
    return false;
  }
}

class GithubStrategy implements AuthStrategy {
  auth(user: User): boolean {
    if (user.githubToken) {
      console.log("Github auth success");
      return true;
    }
    console.log("Github auth failed");
    return false;
  }
}

/**
 * Инициализация стратегий и их использование
 */
const user = new User();
user.jwtToken = "token";
const auth = new Auth(new JWTStrategy());
auth.authUser(user);
auth.setStrategy(new GithubStrategy());
auth.authUser(user);
