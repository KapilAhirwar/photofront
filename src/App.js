import logo from './logo.svg';
import './App.css';
import PhotoConverter from './photoConvert';
import Navbar from './component/navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Navbar/>
        <PhotoConverter/>
      </header>
    </div>
  );
}

export default App;

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center text-4xl font-bold text-blue-600">
//       hello
//     </div>
//   );
// }

// export default App;
