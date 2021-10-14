import React, { useState } from 'react';
import { ResultCard } from "./ResultCard";

export const Add = () => {
    // query (search movie)
    const [query, setQuery] = useState("");
    // storing the result from the query, returning an array of results
    const [results, setResults] = useState([]);

    const onChange = (e) => {
        e.preventDefault();
        // setting the query = what user is typing
        setQuery(e.target.value);
        // fetch result from the movies db
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (!data.errors) {
              setResults(data.results);
            } else {
              setResults([]);
            }
          });
    };


    return (
        <div className="add-page">
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Search for a movie"
                            value={query}
                            onChange={onChange}
                        />
                    </div>
                    {/* display results */}
                    {results.length > 0 && (
                        <ul className="results">
                            {results.map((movie) => (
                                <li key={movie.id}>
                                    <ResultCard movie={movie} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Add;