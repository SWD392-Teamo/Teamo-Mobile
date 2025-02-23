import Spinner from '@/components/Spinner';
import { colors } from '@/constants/colors';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useShallow } from 'zustand/shallow';
import { useParamsStore } from '@/hooks/useParamsStore';
import queryString from 'query-string';
import { useMajorStore } from '@/hooks/useMajorStore';
import { getMajors } from '@/actions/majorAction';
import MajorHeader from './MajorHeader';
import MajorCard from './MajorCard';

export default function MajorsListing() {
  const [isLoading, setLoading] = useState(true);
  const status = "Active";  
  const [search, setSearch] = useState<string>("")

  const { setParams } = useParamsStore();
  const setData = useMajorStore((state) => state.setData);
  
  const params = useParamsStore(
    useShallow((state) => ({
      search: state.search,
      status: status
    }))
  );

  useEffect(() => {
      setParams({ status: status  })
  }, [setParams]);

  const data = useMajorStore(
      useShallow((state) => state.majors)
  );

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      ...params,
      ...(search.trim() ? { search } : {}),
    },
  });

  useEffect(() => {
    getMajors(url).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [search, getMajors]);

  return (
    <SafeAreaView>
      <Spinner 
        isLoading={isLoading}
        spinnerColor={colors.light.tint} 
      />
      <ScrollView>
        <View className = 'w-full flex justify-content-center h-full'>  
          <MajorHeader 
            setSearch={setSearch}
          />
          <View>
            {data.map((major) => (
              <MajorCard 
                key={major.id}
                major={major}
              />
            ))}
          </View>  
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}