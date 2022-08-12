import { useEffect, useState } from 'react';

export let Stories = () => {

    const [stories, updateStories] = useState([]);

    useEffect(() => {
        (async() => {
            const fetchJoke = await fetch('http://localhost:3005/topstories');
            const storyResponse = await fetchJoke.json();
            updateStories(storyResponse);
        })();
    }, [])

    return (

        <div>
            <div>Stories</div>
            {stories.map(story => {
                return (<div key={story.id}>
                    <h3>{story.title} by {story.by}</h3>
                    <p>{new Date(story.time*1000).toLocaleString()}</p>
                </div>)
            })}
        </div>
    )
};