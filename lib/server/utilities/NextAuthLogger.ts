export default class NextAuthLogger {
    public static error(code: string, ...text: Array<any>): void {
        console.error(
            `[next-auth][error][${code.toLowerCase()}]`,
            JSON.stringify(text),
            `\nhttps://next-auth.js.org/errors#${code.toLowerCase()}`
        );
    }

    public static warn(code: string, ...text: Array<any>): void {
        console.warn(
            `[next-auth][warn][${code.toLowerCase()}]`,
            JSON.stringify(text),
            `\nhttps://next-auth.js.org/warnings#${code.toLowerCase()}`
        );
    }

    public static debug(code: string, ...text: Array<any>): void {
        if (!process?.env?._NEXTAUTH_DEBUG) return;
        console.log(`[next-auth][debug][${code.toLowerCase()}]`, JSON.stringify(text));
    }
}
