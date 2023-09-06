import React, {useContext} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/home/home';
import { AppContext } from './utils/context';
import { Helmet } from 'react-helmet';

const App = () => {
  const context = useContext(AppContext);
  return (
    <div className='App'>
    <Helmet>
      <meta name='urn:auecon:aemconnection' content={`aem:${context.url}`} />
    </Helmet>
    <AppContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route exact={true} path={'/'} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
    </div>
  );
};

export default App;
