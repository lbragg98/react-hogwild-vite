import React, { useState } from "react";

function HogForm({ onAddHog }) {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [weight, setWeight] = useState("");
  const [greased, setGreased] = useState(false);
  const [highestMedalAchieved, setHighestMedalAchieved] = useState("bronze");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newHog = {
      name: name.trim(),
      specialty: specialty.trim(),
      weight: Number(weight),
      greased: Boolean(greased),
      highestMedalAchieved,
      image: image.trim(),
    };

    onAddHog(newHog);

    setName("");
    setSpecialty("");
    setWeight("");
    setGreased(false);
    setHighestMedalAchieved("bronze");
    setImage("");
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <h3>Add a Hog</h3>

        <div className="field">
          <label htmlFor="hog-name">Name</label>
          <input
            id="hog-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="hog-specialty">Specialty</label>
          <input
            id="hog-specialty"
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="hog-weight">Weight</label>
          <input
            id="hog-weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="field">
          <div className="ui checkbox">
            <input
              id="hog-greased"
              type="checkbox"
              checked={greased}
              onChange={(e) => setGreased(e.target.checked)}
            />
            <label htmlFor="hog-greased">Greased</label>
          </div>
        </div>

        <div className="field">
          <label htmlFor="hog-medal">Highest Medal Achieved</label>
          <select
            id="hog-medal"
            value={highestMedalAchieved}
            onChange={(e) => setHighestMedalAchieved(e.target.value)}
          >
            <option value="bronze">bronze</option>
            <option value="silver">silver</option>
            <option value="gold">gold</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="hog-image">Image</label>
          <input
            id="hog-image"
            type="text"
            placeholder="babe.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button className="ui primary button" type="submit">
          Add Hog
        </button>
      </form>
    </div>
  );
}

export default HogForm;
