import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import {Home} from './components/Home'
function App() {
  return (
    <NextUIProvider className="app">
      <Home />
    </NextUIProvider>
  );
}

export default App;
