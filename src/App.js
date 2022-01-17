import Chat from "./components/Chat";
import SideBar from "./components/SideBar";

import './styles/app.css'
function App() {

  return (
    <div className="app">
      <div className="app__body">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
