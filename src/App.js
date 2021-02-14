import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from './components/Home/Home';
import Detail from './components/Movie/Detail';

import store from "./store";
import { Provider } from "react-redux";

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header/>
          <div className="app__container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/:page" component={Home} />
              <Route exact path="/detail/:id" component={Detail} />
            </Switch>
          </div> 
        </Router>  
      </div>
    </Provider>  
  );
}

export default App;
