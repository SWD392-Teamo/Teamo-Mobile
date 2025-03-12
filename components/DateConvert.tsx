import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function DateConverter({ isoDate }: { isoDate: string }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (!isoDate) return;

    const date = new Date(isoDate);
    if (isNaN(date.getTime())) {
      setFormattedDate("Invalid Date");
      return;
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    setFormattedDate(`${day}-${month}-${year}`);
  }, [isoDate]);

  return <Text>{formattedDate}</Text>;
}