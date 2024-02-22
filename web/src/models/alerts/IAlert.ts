export type Severity = 'info' | 'success' | 'warning' | 'error';

export default interface IAlert {
    id: string;
    message: string;
    severity: Severity;
    icon?: JSX.Element;
    open: boolean;
}
