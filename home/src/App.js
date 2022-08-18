import { useState } from "react";
import { Gallery } from "./Gallery";
import { Joke } from "./Joke";
import { Stories } from "./Stories";
import { Tasks } from "./Tasks";

export const App = () => {
  const [userQuery, setUserQuery] = useState("");
  const [showGallery, setSHowGallery] = useState(true);

  const updateUserQuery = (e) => setUserQuery(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchQuery();
    }
  };

  const searchQuery = () => {
    window.open(`https://www.google.com/search?q=${userQuery}`, "_blank");
  };

  const toggleGallary = () => {
    setSHowGallery(!showGallery);
  };

  return (
    <div>
      <h1>Hello Deepen!</h1>
      <div className="form">
        <input
          value={userQuery}
          onChange={updateUserQuery}
          onKeyPress={handleKeyPress}
        ></input>
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr />
      <div>{showGallery ? <Gallery /> : null}</div>
      <button onClick={toggleGallary}>
        {showGallery ? "Hide" : "Show"} Gallery
      </button>
      <hr />
      <Tasks />
      <hr />
      <Joke />
      <hr />
      <Stories />
    </div>
  );
};
