import React from "react";
import HogCard from "./HogCard";

function HogList({ hogs, onHideHog }) {
  return (
    <div className="ui three stackable cards">
      {hogs.map((hog) => (
        <HogCard key={hog.name} hog={hog} onHideHog={onHideHog} />
      ))}
    </div>
  );
}

export default HogList;