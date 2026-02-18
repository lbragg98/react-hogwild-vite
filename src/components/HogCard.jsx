import React, { useState } from "react";

function getImageSrc(imageValue) {
  if (!imageValue) return "";
  if (imageValue.startsWith("http")) return imageValue;


  if (imageValue.startsWith("/")) return imageValue;

  return `/images/${imageValue}`;
}

function HogCard({ hog, onHideHog }) {
  const [showDetails, setShowDetails] = useState(false);

  function handleToggleDetails() {
    setShowDetails((prev) => !prev);
  }

  function handleHideClick(e) {
    e.stopPropagation(); // don't toggle details
    onHideHog(hog.name);
  }

  const imgSrc = getImageSrc(hog.image);

  return (
    <div
      aria-label="hog card"
      className="ui card"
      onClick={handleToggleDetails}
      style={{ cursor: "pointer" }}
    >
      <div className="image">
        <img src={imgSrc} alt={hog.name} />
      </div>

      <div className="content">
        <h3>{hog.name}</h3>
      </div>

      {showDetails ? (
        <div className="content">
          <p>
            <strong>Specialty:</strong> {hog.specialty}
          </p>
          <p>
            <strong>Weight:</strong> {hog.weight}
          </p>
          <p>
            <strong>Greased:</strong> {hog.greased ? "true" : "false"}
          </p>
          <p>
            <strong>Highest Medal:</strong> {hog.highestMedalAchieved}
          </p>
        </div>
      ) : null}

      <div className="extra content">
        <button className="ui button" onClick={handleHideClick}>
          Hide Me
        </button>
      </div>
    </div>
  );
}

export default HogCard;
