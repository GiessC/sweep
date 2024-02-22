export default class Queue<T> {
    private elements: T[];
    private front: number;
    private back: number;

    public constructor() {
        this.elements = [];
        this.front = 0;
        this.back = 0;
    }

    public enqueue(item: T): void {
        this.elements.push(item);
        this.back++;
    }

    public dequeue(): T | undefined {
        const element = this.elements[this.front];
        delete this.elements[this.front];
        this.front++;
        return element;
    }

    public peekFirst(): T | undefined {
        if (this.front === this.back) return;
        return this.elements[this.front];
    }

    public peekLast(): T | undefined {
        if (this.front === this.back) return;
        return this.elements[this.back];
    }

    public toArray(): T[] {
        return this.elements.slice(this.front, this.back + 1); // ? Is this + 1 correct?
    }
}
