import { ObjectContainer } from './object-container';
import { Container } from './container';
import {
    Named,
    Shape,
    Point,
    Circle,
    Rect,
    Square,
    Polyline,
    Polygon,
    factorySimple,
    factoryDict,
    factory
} from './shapes';

// Task 1

console.log('');
console.log('# Task 1');
console.log('');

const oc = new ObjectContainer();
oc.add('a');
oc.add('b');
oc.add(1);
oc.add(2);
oc.add({a: 1});
oc.add({a: 2});
oc.add([1]);
oc.add([2]);

for (let item of oc) {
    console.log(item);
}

// Task 1 Better

console.log('');
console.log('# Task 1 Better');
console.log('');

const c = new Container<string>();
c.add('a');
c.add('b');

for (let item of c) {
    console.log(item);
}

// Task 2 & 3

console.log('');
console.log('# Task 2 & 3');
console.log('');


// Named

new Named('John').print();
console.log('');

// Containers

const cs = new Container<Shape>();
cs.add(
    new Point(1, 2)
);
cs.add(
    new Circle(
        new Point(3, 4),
        5
    )
);
cs.add(
    new Rect(6, 7)
);
cs.add(
    new Square(
        new Point(8, 9),
        1
    )
);
cs.add(
    new Polyline(
        new Container<Point>([
            new Point(2, 3),
            new Point(4, 5)
        ])
    )
);

cs.add(
    new Polygon(
        new Container<Point>([
            new Point(4, 5),
            new Point(6, 7)
        ])
    )
);

cs.add(
    factorySimple('point')
);

cs.add(
    factoryDict('point')
);

cs.add(
    factory('circle')
);

for (let item of cs) {
    item.print()
}

console.log('');
console.log(`Shape count: ${Shape.count()}`);
