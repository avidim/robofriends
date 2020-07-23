import React from 'react';
import './App.css';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import CardList from "../components/CardList";
import ErrorBoundry from '../components/ErrorBoundry';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: '',
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }

    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    render() {
        const { robots, searchField } = this.state;
        let filteredRobots = robots.filter(robot =>
            robot.name.toLowerCase().includes(searchField.toLowerCase())
        );
        return !robots.length ?
            <h1 className='tc'>Loading...</h1> :
            <div className='tc'>
                <h1 className='f1'>ROBOFRIENDS</h1>
                <SearchBox searchChange = {this.onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots = {filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
    }
}

export default App;