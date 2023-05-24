export const getStringDate = (date) => {
    return date.toISOString().slice(0, 10); // 2022-07-11T06:01:02.470Z
}