const getToday = () => {
    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    return now.getFullYear()+"-"+(month)+"-"+(day);
}

export const TODAY = getToday()