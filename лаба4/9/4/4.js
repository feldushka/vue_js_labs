function distance(arg1, arg2, arg3, arg4) {
    if (typeof arg1 === "number" &&
        typeof arg2 === "number" &&
        typeof arg3 === "number" &&
        typeof arg4 === "number") {
        const dx = arg3 - arg1;
        const dy = arg4 - arg2;
        return Math.sqrt(dx * dx + dy * dy);
    }
    if (arg1 &&
        typeof arg1 === "object" &&
        "x" in arg1 &&
        typeof arg1.x === "number" &&
        "y" in arg1 &&
        typeof arg1.y === "number" &&
        arg2 &&
        typeof arg2 === "object" &&
        "x" in arg2 &&
        typeof arg2.x === "number" &&
        "y" in arg2 &&
        typeof arg2.y === "number") {
        const p1 = arg1;
        const p2 = arg2;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    throw new Error("Неверные аргументы для функции distance");
}
console.log(distance(0, 0, 3, 4));
console.log(distance({ x: 0, y: 0 }, { x: 3, y: 4 }));
