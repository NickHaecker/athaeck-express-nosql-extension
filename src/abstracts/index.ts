export function ResolvePlattform (plattform: string): any {
    const Plattform: any = require(`./${plattform}`);
    if (plattform) {
        return new Plattform();
    }
    return null;
}