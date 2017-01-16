export class ObjectContainer {
    private list: Object[] = [];

    [Symbol.iterator]() {
        return this.list[Symbol.iterator]();
    }

    add(item: Object) {
        this.list.push(item);
    }

    remove(item: Object) {
        this.list.splice(
            this.list.indexOf(item),
            1
        );
    }

    shift(): Object {
        return this.list.shift();
    }

    unshift(item: Object): number {
        return this.list.unshift(item);
    }

    clean(): void {
        this.list = [];
    }

    get length(): number {
        return this.list.length;
    }

    get first(): Object {
        return this.list[0];
    }

    get last(): Object {
        return this.list[this.list.length - 1];
    }

    get isEmpty(): boolean {
        return this.list.length === 0;
    }
}
