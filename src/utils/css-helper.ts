export default {
    name(elm: string | string[], ...vars: string[]): string {
        const elmClass = `${Array.isArray(elm) ? elm.join('__') : elm}`;
        return [elmClass, ...vars.map(v => `${elmClass}--${v}`)].join(' ');
    }
}
