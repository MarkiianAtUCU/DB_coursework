import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import React from 'react';
import './App.css';

import Home from "./components/Home/Home";
import Book from "./components/Book/Book";
import Library from "./components/Library/Library";

function App() {
    return (
        <Router>
            <header className="App">
                <Link className="App__button" to="/">Home</Link>
                <Link className="App__button" to="/library">Manage Library</Link>
                <Link className="App__button" to="/book">Manage Books</Link>
            </header>
            <Route exact path="/" component={Home}/>
            <Route path="/book" component={Book}/>
            <Route path="/library" component={Library}/>
        </Router>
    );
}

export default App;
