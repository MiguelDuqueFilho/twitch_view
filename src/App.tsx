import { BotProvider } from './contexts/BotContext';
import Routes from './routes';
import './assets/styles/global.css';

function App() {
  return (
    <div className='App'>
      <BotProvider>
        <Routes />
      </BotProvider>
    </div>
  );
}

export default App;
