import { format } from "date-fns";

export default function dateFormatter(date: Date) {
    return format(date, 'dd-MM-yyyy');
}