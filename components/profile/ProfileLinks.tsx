import ExternalLink from '@/components/ExternalLink'
import { icons } from '@/constants';
import { Link } from '@/types';
import React from 'react'
import { View } from 'react-native'

interface Props {
    links: Link[] | undefined;
}

export default function ProfileLinks({links}: Props) {
  return (
      <View>
        {links?.map((link) => (
          <ExternalLink 
            key={link.id}
            title={link.name}
            url={link.url}
            icon={icons.link}
            hideUrl={true}
          />
        ))}
      </View>
  )
}
