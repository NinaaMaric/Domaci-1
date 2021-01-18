import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import AddPost from './components/AddPost';
import Post from './components/Post';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-post" component={AddPost} />
          <Route path="/post/:id" component={Post} /> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
