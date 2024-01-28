export default class DBDate {
    public static toDBDate(date: Date): string {
        return date.toISOString();
    }

    public static fromDBDate(dbDate: string): Date {
        return new Date(dbDate);
    }
}
