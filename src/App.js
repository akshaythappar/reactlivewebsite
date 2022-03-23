import './App.css';
import React, { useEffect,useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const App =()=> {
  // c = "akshay"
  const pageSize = 15
  const apiKey = process.env.REACT_APP_NEWS_API
  
   const [progress, setprogress] = useState(0)
  // setProgress=(progress)=>{
  //   setState({progress:progress})
  // }
  
    return (
      <div>
        <Router>
          <Navbar />
          {/* <News setProgress={setProgress} apiKey={apiKey}   pageSize={pageSize} country="in" category="technology" /> */}
       
            <LoadingBar
              // color='blue'
              color='#f11946'
              progress={progress}
              height={3}
            />
           
           
         
          <Routes>
            <Route exact path="/" element={<News setProgress={setprogress} apiKey={apiKey}   key="general" pageSize={pageSize} country="in" category="general" />}></Route>
            <Route exact path="/business" element={<News setProgress={setprogress} apiKey={apiKey}   key="" pageSize={pageSize} country="in" category="business" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setprogress} apiKey={apiKey}   key="business" pageSize={pageSize} country="in" category="entertainment" />}></Route>
            <Route exact path="/general" element={<News setProgress={setprogress} apiKey={apiKey}   key="general" pageSize={pageSize} country="in" category="general" />}></Route>
            <Route exact path="/health" element={<News setProgress={setprogress} apiKey={apiKey}   key="health" pageSize={pageSize} country="in" category="health" />}></Route>
            <Route exact path="/science" element={<News setProgress={setprogress} apiKey={apiKey}   key="science" pageSize={pageSize} country="in" category="science" />}></Route>
            <Route exact path="/sports" element={<News setProgress={setprogress} apiKey={apiKey}   key="sports" pageSize={pageSize} country="in" category="sports" />}></Route>
            <Route exact path="/technology" element={<News setProgress={setprogress} apiKey={apiKey}   key="technology" pageSize={pageSize} country="in" category="technology" />}></Route>

          </Routes>
        </Router>

      </div>
    )
  
}
export default App
