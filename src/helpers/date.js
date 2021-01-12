const tryPad0 = number => number < 10 ? `0${number}` : number;

export const date2string = stringifiedDate => {
    const date = new Date(stringifiedDate);

    return `${tryPad0(date.getMonth() + 1)}/${tryPad0(date.getDate())}/${date.getFullYear()} ${tryPad0(date.getHours())}:${tryPad0(date.getMinutes())}:${tryPad0(date.getSeconds())}`;
};