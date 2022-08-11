import { useState } from 'react';
import { Joke } from './Joke';
import { Stories } from './Stories';

export const App = () => {

    const [userQuery, setUserQuery] = useState('');

    const updateUserQuery = (e) => setUserQuery(e.target.value);

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            searchQuery();
        }
    }

    const searchQuery = () => {
        window.open(`https://www.google.com/search?q=${userQuery}`, '_blank');
    }

    return (
        <div>
            <h1>Hello Deepen!</h1>
            <div className="form">
                <input value={userQuery} onChange={updateUserQuery} onKeyPress={handleKeyPress}></input>
                <button onClick={searchQuery}>Search</button>
            </div>
            <hr />
            <Joke />
            <hr />
            <Stories />
            <hr />
        </div>
    )
}