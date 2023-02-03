// import logo from './logo.svg';
import './App.css';
import JobTypes from './JobList/JobTypes';
import TextBar from './JobList/TextBar';

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        
      <TextBar/>
      <JobTypes/>
      </header>
    </div>
    </>
  );
}

export default App;
