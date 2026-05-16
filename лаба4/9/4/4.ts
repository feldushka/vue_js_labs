interface Point {
  x: number;
  y: number;
}

function distance(x1: number, y1: number, x2: number, y2: number): number;
function distance(p1: Point, p2: Point): number;

function distance(
  arg1: number | Point,
  arg2: number | Point,
  arg3?: number,
  arg4?: number
): number {
  if (
    typeof arg1 === "number" &&
    typeof arg2 === "number" &&
    typeof arg3 === "number" &&
    typeof arg4 === "number"
  ) {
    const dx = arg3 - arg1;
    const dy = arg4 - arg2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  if (
    arg1 &&
    typeof arg1 === "object" &&
    "x" in arg1 &&
    typeof (arg1 as { x: unknown }).x === "number" &&
    "y" in arg1 &&
    typeof (arg1 as { y: unknown }).y === "number" &&
    arg2 &&
    typeof arg2 === "object" &&
    "x" in arg2 &&
    typeof (arg2 as { x: unknown }).x === "number" &&
    "y" in arg2 &&
    typeof (arg2 as { y: unknown }).y === "number"
  ) {
    const p1 = arg1 as Point;
    const p2 = arg2 as Point;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  throw new Error("Неверные аргументы для функции distance");
}

console.log(distance(0, 0, 3, 4));
console.log(distance({ x: 0, y: 0 }, { x: 3, y: 4 }));