import React, { useContext, useEffect, useState } from 'react';
import AEMHeadless from '@adobe/aem-headless-client-js';
import './home.css';
import { AppContext } from '../../utils/context';
import Teaser from '../../components/teaser/teaser';
import ImageList  from '../../components/imagelist/imagelist';
  
const Home = () => {
  const [content, setContent] = useState({});
  const context = useContext(AppContext);

  const [list, setList] = useState({});

  useEffect(() => {
    const sdk = new AEMHeadless({
        serviceURL: context.url,
        endpoint: context.endpoint,
        auth: context.token
    });
    //teaser persistent query
    sdk.runPersistedQuery(`${context.project}/teaser`, { path: `/content/dam/${context.project}/hero` })
    .then(({ data }) => {
    if (data) {
        setContent(data);
    }
    })
    .catch((error) => {
    console.log(`Error with pure-headless/teaser. ${error.toJSON()}`);
    });
    //imagelist persistent query
    sdk.runPersistedQuery('pure-headless/imagelist')
    .then(({ data }) => {
        if (data) {
        setList(data);
        }
    })
    .catch((error) => {
        console.log(`Error with pure-headless/imagelist. ${error.toJSON()}`);
    });
  }, [context]);


  return (
    <div className='main-body'>
      <div>{content.component && <Teaser content={content.component.item} />}</div>
      <div>{list.cards && <ImageList content={list.cards} />}</div>
    </div>
  );
};

export default Home;
