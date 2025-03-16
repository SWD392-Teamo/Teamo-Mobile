import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useShallow } from 'zustand/shallow';
import { useParamsStore } from '@/hooks/useParamsStore';
import queryString from 'query-string';
import { useSubjectStore } from '@/hooks/useSubjectStore';
import { getSubjects } from '@/actions/subjectAction';
import { useLoading } from '@/providers/LoadingProvider';
import BackButton from '@/components/BackButton';
import SearchBar from '@/components/SearchBar';
import { router } from 'expo-router';
import { Subject } from '@/types';

export default function SelectSubjectForCreateGroup() {
  const { showLoading, hideLoading } = useLoading();
  const [hasMore, setHasMore] = useState(true);
  const status = "Active";  
  const [search, setSearch] = useState<string>("");
  const { setSelectedSubject } = useSubjectStore();
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const { setParams } = useParamsStore();
  
  const params = useParamsStore(
    useShallow((state) => ({
      status: status,
      search: state.search
    }))
  );

  useEffect(() => {
      setParams({ 
        status: status  
      })
  }, [setParams]);

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

  useEffect(() => {
    let allData: any[] = [];
    let currentPage = 1;

    const fetchAllSubjects = async () => {
      showLoading();
      setHasMore(true);
      allData = [];

      while (true) {
        const response = await getSubjects(getUrl(currentPage));

        if (response.data.length === 0) break;

        allData = [...allData, ...response.data];
        currentPage++;

        if (allData.length >= response.count) break;
      }

      setAllSubjects(allData);
      hideLoading();
    };

    fetchAllSubjects();
  }, [search]);

  function onSelectedSubject() {
    router.push('/CreateGroupForm');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className = 'w-full flex justify-content-center'>  
          <View className="m-5 ml-5">
            <View className="flex flex-row justify-content-start mt-2">
              <BackButton 
                url="(tabs)/groups" 
              />
              <Text className="ml-5 text-bsm font-blight">Back</Text>
            </View >
            <View className="flex flex-row justify-content-center">
              <Text className="m-2 mr-5 text-bl text-secondary font-bsemibold">Subjects</Text>
              <SearchBar setSearch = {setSearch} />
            </View>
          </View>
          <View>
            {allSubjects.map((subject) => (
              <Pressable 
                key={subject.id}
                onPress={() => {
                    setSelectedSubject(subject);
                    onSelectedSubject();
                }}>
                <View className="m-3">
                  <View className="w-full border-2 border-primaryLight rounded-lg overflow-hidden shadow shadow-black/10 elevation-2">
                    <View className="mb-2 ml-2 mr-2 px-1 py-2">
                      <Text className="font-bbold text-primary text-bsm">{subject.code}</Text>
                      <Text className="font-bregular text-primary text-bsm text-wrap">{subject.name}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View> 
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}