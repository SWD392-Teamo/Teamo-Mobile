import { format } from "date-fns";

export default function dateTimeFormatter(date: Date) {
    return format(date, 'dd-MM-yyyy hh:MM');
}