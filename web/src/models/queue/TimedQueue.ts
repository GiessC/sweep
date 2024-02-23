import Queue from './Queue';

export default class TimedQueue<T> extends Queue<T> {
    private waitTimeSeconds: number;

    public constructor(waitTimeSeconds: number) {
        super();
        this.waitTimeSeconds = waitTimeSeconds;
    }

    public enqueue(item: T) {
        super.enqueue(item);
        setTimeout(() => {
            super.dequeue();
        }, this.waitTimeSeconds * 1000);
    }
}
