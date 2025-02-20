import ExternalLink from '@/components/ExternalLink'
import { Link } from '@/types';
import React from 'react'
import { Text, View } from 'react-native'

interface Props {
    links: Link[] | undefined;
}

export default function ProfileLinks({links}: Props) {
  return (
    <View className='flex flex-row mt-10 ml-20 justify-content-start'>
        <View>
            {links?.map((link) => (
            <ExternalLink 
                key={link.id}
                title={link.name}
                url={link.url}
            />
            ))}
        </View>
    </View>
  )
}
