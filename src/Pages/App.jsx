import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Access denied</h1>
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Switch />
                <Route path="/" component={Home} />
            <Switch />
        </BrowserRouter>
    );
}

export default App;
