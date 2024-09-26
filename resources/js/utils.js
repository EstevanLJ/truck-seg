import moment from "moment";

export const getDateFromTimeString = (time) => {
    let explodedDate = time.split(":");
    let date = new Date();
    date.setHours(explodedDate[0]);
    date.setMinutes(explodedDate[1]);
    date.setSeconds(explodedDate[2]);

    return moment(date);
};

export const getDateFromDateString = (time) => {
    let explodedDate = time.split("-");
    let date = new Date();
    date.setFullYear(explodedDate[0]);
    date.setMonth(explodedDate[1] - 1);
    date.setDate(explodedDate[2]);

    return moment(date);
};
