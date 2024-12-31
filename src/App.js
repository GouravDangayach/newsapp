import './App.css';
import React, {useState} from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [progressData, setProgressData] = useState(0);
  const apiKey = process.env.REACT_APP_NEWS_API;
  const pageSize = 6;
  const country = 'us';
  
  return (
      <BrowserRouter>
        <NavBar />
        <LoadingBar
          color="#f11946"
          progress={progressData}
          onLoaderFinished={() => setProgressData(0)}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgressData} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="general" />} ></Route>
          <Route exact path="/business" element={<News setProgress={setProgressData} apiKey={apiKey} key="business" pageSize={pageSize} country={country} category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgressData} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={country} category="entertainment" />} />
          <Route exact path="/health" element={<News setProgress={setProgressData} apiKey={apiKey} key="health" pageSize={pageSize} country={country} category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgressData} apiKey={apiKey} key="science" pageSize={pageSize} country={country} category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgressData} apiKey={apiKey} key="sports" pageSize={pageSize} country={country} category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgressData} apiKey={apiKey} key="technology" pageSize={pageSize} country={country} category="technology" />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;