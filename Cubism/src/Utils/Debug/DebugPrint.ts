let DEBUG = true;
export default function dPrint(...args: any[]) {
    if (DEBUG) {
        console.log(...args);
    }
}