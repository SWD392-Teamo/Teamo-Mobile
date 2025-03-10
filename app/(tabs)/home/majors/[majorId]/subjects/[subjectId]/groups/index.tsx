import { getData } from "@/actions/groupAction";
import { useMajorStore } from "@/hooks/useMajorStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import GroupHeader from "./GroupHeader";
import GroupCard from "./GroupCard";
import { useGroupStore } from "@/hooks/useGroupStore";
import { SafeAreaView, ScrollView, ToastAndroid, View } from "react-native";

export default function Listings() {
  const { selectedSubject } = useSubjectStore(
    useShallow((state) => ({
      selectedSubject: state.selectedSubject,
    }))
  );

  const { selectedMajor } = useMajorStore(
    useShallow((state) => ({
      selectedMajor: state.selectedMajor,
    }))
  );

  const [search, setSearch] = useState<string>("");

  const params = useParamsStore(
    useShallow((state) => ({
      subjectId: selectedSubject?.id,
      search: state.search,
    }))
  );

  const data = useGroupStore(
    useShallow((state) => ({
      groups: state.groups,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }))
  );

  const setData = useGroupStore((state) => state.setData);
  const setParams = useParamsStore((state) => state.setParams);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      ...params,
      ...(search.trim() ? { search } : {}),
    },
  });

  useEffect(() => {
    getData(url)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        ToastAndroid.show(error.status + " " + error.message, ToastAndroid.SHORT);
      })
      .finally(() => {
      });
  }, [url, setData]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full flex justify-center">
          {selectedMajor && selectedSubject && (
            <GroupHeader subject={selectedSubject} major={selectedMajor} setSearch={setSearch} />
          )}
          <View className="w-full p-3">
            {data.groups &&
              data.groups
                .map((a) => (
                  <GroupCard key={a.id} group={a} />
                ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
