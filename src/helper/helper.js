export const convertDateToLocaleDateString = (date) => {
    let newDate = new Date(date);
    return newDate.toLocaleDateString();
}