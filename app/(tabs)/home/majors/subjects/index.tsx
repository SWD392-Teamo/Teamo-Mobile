import Spinner from '@/components/Spinner';
import { colors } from '@/constants/colors';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useShallow } from 'zustand/shallow';
import { useParamsStore } from '@/hooks/useParamsStore';
import queryString from 'query-string';
import { useMajorStore } from '@/hooks/useMajorStore';
import { useSubjectStore } from '@/hooks/useSubjectStore';
import { getSubjects } from '@/actions/subjectAction';
import SubjectHeader from './SubjectHeader';
import SubjectCard from './SubjectCard';

export default function SubjectsListing() {
  const [isLoading, setLoading] = useState(true);
  const status = "Active";  
  const [search, setSearch] = useState<string>("")

  const { selectedMajor } = useMajorStore(
    useShallow((state) => ({
      selectedMajor: state.selectedMajor
    }))
  );

  const { setParams } = useParamsStore();
  const setData = useSubjectStore((state) => state.setData);
  
  const params = useParamsStore(
    useShallow((state) => ({
        majorId: state.majorId,
        search: state.search
    }))
  );

  useEffect(() => {
      setParams({ status: status  })
  }, [setParams]);

  const data = useSubjectStore(
      useShallow((state) => state.subjects)
  );

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      ...params,
      ...(search.trim() ? { search } : {}),
    },
  });

  useEffect(() => {
    if(selectedMajor) {
        getSubjects(url).then((data) => {
        setData(data);
        setLoading(false);
        });
    }
  }, [search, selectedMajor, getSubjects]);

  if (!selectedMajor) {
    return (
      <SafeAreaView>
        <View className="flex-1 justify-center items-center">
          <Text className="font-bregular text-bm text-primary">
            No major selected
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Spinner 
        isLoading={isLoading}
        spinnerColor={colors.light.tint} 
      />
      <ScrollView>
        <View className = 'w-full flex justify-content-center'>  
          <SubjectHeader
            major={selectedMajor}
            setSearch={setSearch}
          />
          <View>
            {data.map((subject) => (
              <SubjectCard 
                key={subject.id}
                subject={subject}
              />
            ))}
          </View>  
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}