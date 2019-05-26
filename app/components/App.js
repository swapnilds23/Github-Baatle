import React from 'react';
import Popular from './Popular';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Result from './Result';
import { Route, BrowserRouter as Router, Switch } from'react-router-dom';

class App extends React.Component{
    render() {
        return(
            <Router >
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route  path='/popular' component={Popular} />
                        <Route exact path='/battle' component={Battle} /> 
                        <Route path='/battle/results' component={Result} /> 
                        <Route render = {()=>{
                            return <p>Not Found</p>
                        }} />
                    </Switch>
                      
                </div>
                
            </Router>
            
        )
    }
}

export default App;