import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import Visualization from './components/Visualization/Visualization';
import Cartoflex from './components/Cartoflex/Cartoflex';

function App() {
    return (
        <Switch>
            <Route exact path='/' render={() => <Cartoflex />} />
            <Route
                exact
                path='/visualization'
                render={() => <Visualization />}
            />
        </Switch>
    );
}

export default withRouter(App);
