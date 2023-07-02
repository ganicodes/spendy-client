export const convertDateToLocaleDateString = (date) => {
    let newDate = new Date(date);
    return newDate.toLocaleDateString();
}
export function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}