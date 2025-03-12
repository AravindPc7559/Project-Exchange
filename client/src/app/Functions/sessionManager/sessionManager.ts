export const addToSession = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}