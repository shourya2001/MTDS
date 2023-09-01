import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload.js'
import Footer from './components/Footer.js'

function App() {

  const data = [
    { col1: 'Row 1, Column 1', col2: 'Row 1, Column 2' },
    { col1: 'Row 2, Column 1', col2: 'Row 2, Column 2' },
    { col1: 'Row 3, Column 1', col2: 'Row 3, Column 2' },
  ];


  return (
    <div className="App" style={{backgroundColor:"#000000"}}>
      <header className="App-header" >
        <h2 style={{marginTop: "50px"}}>MULTI-DOCUMENT TEXT SUMMARIZATION</h2> 
        <p style={{marginTop: "-20px"}}>Get a concise and summary from data collected over PDF files that are uploaded. </p><br/>
        <FileUpload/>
        <br></br>
        <br></br>
      </header> 
      {/* <Footer/> */}
    </div>
  );
}

export default App;
