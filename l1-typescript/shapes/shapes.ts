import { Container } from './container';
import { InvalidArgumentError } from './errors';

// Printable

abstract class Printable {
    print(): void {
        console.log(this.toString());
    }
}

// Named

export class Named extends Printable {
    constructor(private name: string) {
        super();
    };

    toString(): string {
        return `Named. Name: ${this.name}`;
    }
}


// Shapes

export abstract class Shape extends Printable {
    private static shapeCount: number = 0;

    static count(): number {
        return this.shapeCount;
    }

    constructor() {
        super();
        Shape.shapeCount++;
    };
}

export class Point extends Shape {
    constructor(public x: number, public y: number) {
        super();
    };

    toString(): string {
        return `Point. X, Y: ${this.x}, ${this.y}`;
    }
}

export class Circle extends Shape {
    constructor(private center: Point, private r: number) {
        super();
    };

    toString(): string {
        return `Circle. Center: ${this.center.x}, ${this.center.y}. Radius: ${this.r}`;
    }
}

export class Rect extends Shape {
    constructor(private ox: number, private oy: number) {
        super();
    };

    toString(): string {
        return `Rect. OX, OY: ${this.ox}, ${this.oy}`;
    }
}

export class Square extends Shape {
    constructor(private topLeft: Point, private l: number) {
        super();
    };

    toString(): string {
        return `Square. Top left corner: ${this.topLeft.x}, ${this.topLeft.y}. Length: ${this.l}`;
    }
}

export class Polyline extends Shape {
    constructor(protected points: Container<Point>) {
        super();
    };

    addPoint(p: Point): void {
        this.points.add(p);
    }

    toString(): string {
        const formated = '(' + Array.from(this.points).join('), (') + ')';
        return `Polyline. Points: ${formated}`;
    }
}

export class Polygon extends Polyline {
    toString(): string {
        const formated = '(' + Array.from(this.points).join('), (') + ')';
        return `Polygon. Points: ${formated}`;
    }
}

// Simple factory

export function factorySimple(typeName: string): Shape {
    switch (typeName) {
        case 'point':
            return new Point(1, 2);

        case 'circle':
            return new Circle(new Point(1, 2), 3);

        case 'rect':
            return new Rect(6, 7);

        case 'square':
            return new Square(
                new Point(8, 9),
                1
            );

        case 'polyline':
            return new Polyline(
                new Container<Point>([
                    new Point(2, 3),
                    new Point(4, 5)
                ])
            );

        case 'polygon':
            return new Polygon(
                new Container<Point>([
                    new Point(4, 5),
                    new Point(6, 7)
                ])
            );

        default:
            throw new Error(`Invalid type name: ${typeName}`);
    }
}

// Random factory utils

function randomInRange(end: number, start: number = 1): number {
    return Math.floor((Math.random() * end) + start);
}

const randomInRange10 = ():number => randomInRange(10);

// Random factory

export interface ShapeFactory {
    create(): Shape
}

export class PointFactory implements ShapeFactory {
    create(): Point {
        return new Point(
            randomInRange10(),
            randomInRange10()
        );
    }
}

export class CircleFactory implements ShapeFactory {
    create(): Circle {
        return new Circle(
            new Point(
                randomInRange10(),
                randomInRange10()
            ),
            randomInRange10()
        );
    }
}

export class RectFactory implements ShapeFactory {
    create(): Rect {
        return new Rect(6, 7);
    }
}

export class SquareFactory implements ShapeFactory {
    create(): Square {
        return new Square(
            new Point(
                randomInRange10(),
                randomInRange10()
            ),
            randomInRange10()
        );
    }
}

export class PolylineFactory implements ShapeFactory {
    create(): Polyline {
        return new Polyline(
            new Container<Point>([
                new Point(randomInRange10(), randomInRange10()),
                new Point(randomInRange10(), randomInRange10())
            ])
        );
    }
}

export class PolygonFactory implements ShapeFactory {
    create(): Polygon {
        return new Polygon(
            new Container<Point>([
                new Point(randomInRange10(), randomInRange10()),
                new Point(randomInRange10(), randomInRange10())
            ])
        );
    }
}

export function factoryDict(type: string) {
    const factoryDictX =  {
        point: PointFactory,
        circle: CircleFactory,
        rect: RectFactory,
        square: SquareFactory,
        polyline: PolylineFactory,
        polygon: PolygonFactory
    };

    if (!(type in factoryDictX)) {
        throw new InvalidArgumentError(`Invalid type argument: ${type}`);
    }

    const shapeFactory: ShapeFactory = new factoryDictX[type]();

    return shapeFactory.create();
}

export function factory(type: string): Shape {
    const shapeFactoryName = `${type[0].toLocaleUpperCase()}${type.slice(1)}Factory`;

    if (!(shapeFactoryName in this)) {
        throw new InvalidArgumentError(`Invalid type argument: ${type}`);
    }

    const shapeFactory: ShapeFactory = new this[shapeFactoryName]();

    return shapeFactory.create();
}
