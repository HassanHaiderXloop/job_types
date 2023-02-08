// import logo from './logo.svg';
import './App.css';
import Demo from './JobList/Demo/Demo';
import JobTypes from './JobList/JobTypes';
import TextBar from './JobList/TextBar';


function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
       
      {<TextBar/> }
      {/* {<JobTypes/>} */}
      {<Demo/>} 
      </header>
    </div>
    </>
  );
  
}

export default App;
