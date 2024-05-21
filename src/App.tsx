import './App.css';
import FlowEditor from './components/FlowEditor';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import 'reactflow/dist/style.css';


function App() {

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-row h-full">\
        <FlowEditor />
        <SideBar />
      </div>
    </div>
  );
}

export default App;
