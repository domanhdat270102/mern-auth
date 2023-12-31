import React, { Component} from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

export default function FacebookMsg() {
  return (
    <FacebookProvider appId="276849498377688" chatSupport>
        <CustomChat pageId="191377740729865" minimized={false}/>
      </FacebookProvider> 
  )
}
