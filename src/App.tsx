import './App.scss';
import { StudyTimer } from './components/StudyTimer';

function App() {
  const time = new Date();
  time.setMinutes(time.getMinutes() + 25)
  return (
    <div className="App font-WixMadeForText">
      <StudyTimer expiryTimestamp={time} autoStart={false}/>
    </div>
  );
}

export default App;
