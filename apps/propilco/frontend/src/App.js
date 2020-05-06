import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import Visualization from './components/Visualization/Visualization';
import Propilco from './components/Propilco/Propilco';

function App() {
    return (
        <Switch>
            <Route exact path='/' render={() => <Propilco />} />
            <Route
                exact
                path='/visualization'
                render={() => <Visualization />}
            />
        </Switch>
    );
}

export default withRouter(App);
