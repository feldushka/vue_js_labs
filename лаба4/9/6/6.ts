interface IStrategy {
  execute(data: string): string;
}

class UpperCaseStrategy implements IStrategy {
  execute(data: string): string {
    return data.toUpperCase();
  }
}

class LowerCaseStrategy implements IStrategy {
  execute(data: string): string {
    return data.toLowerCase();
  }
}

class Context {
  private strategy: IStrategy;

  constructor(strategy: IStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: IStrategy): void {
    this.strategy = strategy;
  }

  execute(data: string): string {
    return this.strategy.execute(data);
  }
}


class LegacyPrinter {
  printOld(text: string): void {
    console.log(`[Legacy Printer] ${text}`);
  }
}

interface IModernPrinter {
  print(text: string): void;
}

class PrinterAdapter implements IModernPrinter {
  constructor(private legacy: LegacyPrinter) {}

  print(text: string): void {
    this.legacy.printOld(text);
  }
}


interface IObserver {
  update(message: string): void;
}

class EmailObserver implements IObserver {
  constructor(private email: string) {}
  update(message: string): void {
    console.log(`[Email → ${this.email}] Получено: ${message}`);
  }
}

class SmsObserver implements IObserver {
  constructor(private phone: string) {}
  update(message: string): void {
    console.log(`[SMS → ${this.phone}] Получено: ${message}`);
  }
}

class NotificationSubject {
  private observers: IObserver[] = [];

  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(message: string): void {
    this.observers.forEach(observer => observer.update(message));
  }
}


console.log("=== Strategy ===");
const context = new Context(new UpperCaseStrategy());
console.log(context.execute("hello world"));
context.setStrategy(new LowerCaseStrategy());
console.log(context.execute("HELLO WORLD"));

console.log("\n=== Adapter ===");
const legacyPrinter = new LegacyPrinter();
const modernPrinter: IModernPrinter = new PrinterAdapter(legacyPrinter);
modernPrinter.print("Важный документ");

console.log("\n=== Observer ===");
const notifier = new NotificationSubject();
const emailObs = new EmailObserver("user@example.com");
const smsObs = new SmsObserver("+79123456789");

notifier.addObserver(emailObs);
notifier.addObserver(smsObs);

notifier.notify("Сервер перезапущен успешно!"); 