import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandinPage from './components/LandinPage/LandinPage';
import Home from './components/Home/Home';
import DogDetail from './components/DogDetail/DogDetail';
import CreateDog from './components/CreateDog/CreateDog';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandinPage/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/dogs/:id" element={<DogDetail/>}/>
        {/* <Route path="/dog/create/" element={<CreateDog/>}/> */}
        <Route exact path="/Home/dog/create/" element={<CreateDog/>}/>
      </Routes>
    </div>
  );
}

export default App;
