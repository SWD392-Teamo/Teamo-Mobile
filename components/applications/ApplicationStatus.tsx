import { Text } from "react-native";

export default function ApplicationStatusBadge({ status }: { status: string }) {
    const statusClasses: Record<string, string> = {
      Approved: "bg-[#DEFCE6] text-[#198254]",
      Requested: "bg-[#FEF8BE] text-[#854900]",
      Rejected: "bg-[#FDE2E1] text-[#BE0000]",
    };
  
    return (
      <Text className={`w-[75px] text-center px-3 py-1 rounded-full text-sm font-bsemibold ${statusClasses[status] || "bg-gray-100 text-gray-700"}`}>
        {status}
      </Text>
    );
  }
  