import Header from './components/Header/Header'
import Body from './components/Body/Body';
import TaskWindow from './components/TaskWindow/TaskWindow';
import History from './components/History/History';

import './App.css'


function App() {

  return (
    <>
      <div className="main">
        <Header />
        <Body />
      </div>
      <TaskWindow />
      <History />
    </>
  );
}

export default App;
