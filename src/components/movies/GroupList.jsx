import React from "react";

const GroupList = ({ genres, currentGenre, onGenreChange }) => {
  return (
    <div className="list-group">
      {genres.map(genre => (
        <button
          key={genre._id}
          type="button"
          className={
            currentGenre.name === genre.name
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          onClick={() => onGenreChange(genre)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GroupList;
