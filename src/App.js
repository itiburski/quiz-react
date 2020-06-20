import React from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import Home from './Home';
import Quizzes from './Quizzes';
import TemplateContainer from './components/templates/TemplateContainer';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="container">
        <h1 className="title">Quiz App</h1>
        <ul className="header">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/templates">Templates</NavLink></li>
          <li><NavLink to="/quizzes">Quizzes</NavLink></li>
        </ul>
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/templates" component={TemplateContainer} />
          <Route path="/quizzes" component={Quizzes} />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
