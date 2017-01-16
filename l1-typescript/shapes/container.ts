import { InvalidArgumentError, BaseError } from './errors'

export class Container<T> {
    [Symbol.iterator]() {
        return this.list[Symbol.iterator]();
    }

    constructor(private list: T[] = []) {}

    add(item: T) {
        this.list.push(item);
    }

    remove(item: T) {
        const itemIndex = this.list.indexOf(item);
        if (itemIndex === -1) {
            throw new InvalidArgumentError(`Container item does not exists: ${item}`);
        }

        this.list.splice(itemIndex, 1);
    }

    shift(): T {
        this.checkEmpty();

        return this.list.shift();
    }

    unshift(item: T): number {
        return this.list.unshift(item);
    }

    clean(): void {
        this.list = [];
    }

    get length(): number {
        return this.list.length;
    }

    get first(): T {
        this.checkEmpty();

        return this.list[0];
    }

    get last(): T {
        this.checkEmpty();

        return this.list[this.list.length - 1];
    }

    get isEmpty(): boolean {
        return this.list.length === 0;
    }

    private checkEmpty() {
        if (this.isEmpty) {
            throw new ContainerEmptyError('Container is empty');
        }
    }
}

export class ContainerEmptyError extends BaseError {}
