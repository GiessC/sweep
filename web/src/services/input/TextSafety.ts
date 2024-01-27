export default class TextSafety {
    public static fromEscaped(str: string): string {
        const parser = new DOMParser();
        return (
            parser.parseFromString(str.normalize(), 'text/html').body
                .textContent ?? ''
        );
    }
}
