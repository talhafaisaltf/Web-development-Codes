import moment from "moment";

const convertDataToFormet = (data) => {
    if (!data) {
        return null;
    }

    return moment(data).format("MMMM D, [at] YYYY h:mm a");
};

export const helperService = {
    convertDataToFormet,
};
