import { getGroups } from "@/actions/groupAction";
import { useMajorStore } from "@/hooks/useMajorStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import queryString from "query-string";
import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import GroupHeader from "./GroupHeader";
import GroupCard from "@/components/groups/GroupCard";
import { useGroupStore } from "@/hooks/useGroupStore";
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useLoading } from "@/providers/LoadingProvider";
import loadMore from "@/utils/loadMore";
import { colors } from "@/constants/colors";
import { useFocusEffect } from "expo-router";

export default function Listings() {
  const { showLoading, hideLoading } = useLoading();
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
    useShallow((state) => state.groups)
  )

  const setData = useGroupStore((state) => state.setData);
  const resetData = useGroupStore((state) => state.resetData);
  const appendData = useGroupStore((state) => state.appendData);
  

  const getUrl = (pageNum:number) => {
    return queryString.stringifyUrl({
      url: "",
      query: {
        ...params,
        ...(search.trim() ? { search } : {}),
        pageIndex: pageNum
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      setHasMore(true);
      showLoading();
  
      getGroups(getUrl(1)).then((response) => {
        setData(response);
        setHasMore(response.data.length < response.count);
        hideLoading();
      });
      
      // Optional: Add cleanup if necessary, e.g., reset states when leaving the screen
      return () => {
        resetData(); // Clear groups if needed when navigating away
      };
    }, [search, getGroups])
  );

  const handleLoadMore = async () => {
      if (loadingMore || !hasMore) return;
        
      setLoadingMore(true);
        
      const result = await loadMore(
        page,
        data,
        getUrl,
        getGroups, 
        appendData
      );
        
      setHasMore(result.hasMore);
      setPage(result.newPage);
      setLoadingMore(false);
    };
  
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
      const paddingToBottom = 20;
      return layoutMeasurement.height + contentOffset.y >= 
        contentSize.height - paddingToBottom;
    };

  return (
    <SafeAreaView>
      <ScrollView
        onScroll={({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (isCloseToBottom(nativeEvent)) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        <View className="w-full flex justify-center">
          {selectedMajor && selectedSubject && (
            <GroupHeader subject={selectedSubject} major={selectedMajor} setSearch={setSearch} />
          )}
          <View className="w-full flex flex-col p-3 gap-6">
            {data &&
              data.map((group) => (
                <GroupCard key={group.id} group={group} owned={false} />
              ))}
          </View>
          {loadingMore && (
            <View className="py-4 flex items-center justify-center">
              <ActivityIndicator size="small" color={colors.light.tint} />
              <Text className="text-center mt-2 text-gray-500">Loading group...</Text>
            </View>
          )}  
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
