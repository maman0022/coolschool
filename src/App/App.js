import './App.css';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Switch>
      <Route path='/' component={LandingPage}/>
    </Switch>
  );
}

export default App;
