export type UserType = {
  name: string;
  age: number;
  hello(): void;
};

export class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  hello(): void {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }
}

const user2: UserType = new User("Иван", 30);
user2.hello();