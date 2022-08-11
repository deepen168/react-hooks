import {useState, Useffect, useEffect} from 'react';

export const Joke = () => {

    const [joke, updateJoke] = useState({});

    useEffect(() => {
        (async() => {
            const fetchJoke = await fetch('http://localhost:3005/random_joke');
            const { punchline, setup } = await fetchJoke.json();
            updateJoke({punchline, setup});
        })();
    }, [])

    return (
        <div>
            <div>Jokes</div>
            <p>{joke.punchline}</p>
            <p>{joke.setup}</p>
        </div>
    )
}

