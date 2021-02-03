import './App.scss';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Card from "./pages/Card.js";

function App() {
    return (
        <div id="app">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/card">
                    <Card />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
