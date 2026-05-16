class UpperCaseStrategy {
    execute(data) {
        return data.toUpperCase();
    }
}
class LowerCaseStrategy {
    execute(data) {
        return data.toLowerCase();
    }
}
class Context {
    strategy;
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    execute(data) {
        return this.strategy.execute(data);
    }
}
class LegacyPrinter {
    printOld(text) {
        console.log(`[Legacy Printer] ${text}`);
    }
}
class PrinterAdapter {
    legacy;
    constructor(legacy) {
        this.legacy = legacy;
    }
    print(text) {
        this.legacy.printOld(text);
    }
}
class EmailObserver {
    email;
    constructor(email) {
        this.email = email;
    }
    update(message) {
        console.log(`[Email → ${this.email}] Получено: ${message}`);
    }
}
class SmsObserver {
    phone;
    constructor(phone) {
        this.phone = phone;
    }
    update(message) {
        console.log(`[SMS → ${this.phone}] Получено: ${message}`);
    }
}
class NotificationSubject {
    observers = [];
    addObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }
    notify(message) {
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
const modernPrinter = new PrinterAdapter(legacyPrinter);
modernPrinter.print("Важный документ");
console.log("\n=== Observer ===");
const notifier = new NotificationSubject();
const emailObs = new EmailObserver("user@example.com");
const smsObs = new SmsObserver("+79123456789");
notifier.addObserver(emailObs);
notifier.addObserver(smsObs);
notifier.notify("Сервер перезапущен успешно!");
