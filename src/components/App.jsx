import React, { useMemo, useState } from "react";
import Nav from "./Nav";
import hogsData from "../porkers_data";

function App() {
  const [hogs, setHogs] = useState(hogsData);

  // UI state
  const [hiddenByName, setHiddenByName] = useState(() => ({}));
  const [expandedByName, setExpandedByName] = useState(() => ({}));

  // Filter / sort state
  const [showGreasedOnly, setShowGreasedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("name"); // "name" | "weight"

  // Form state
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [greased, setGreased] = useState(false);
  const [highestMedalAchieved, setHighestMedalAchieved] = useState("bronze");
  const [image, setImage] = useState("");

  function toggleDetails(hogName) {
    setExpandedByName((prev) => ({ ...prev, [hogName]: !prev[hogName] }));
  }

  function hideHog(hogName) {
    setHiddenByName((prev) => ({ ...prev, [hogName]: true }));
  }

  function handleGreasedFilterChange(e) {
    setShowGreasedOnly(e.target.checked);
  }

  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  function handleAddHog(e) {
    e.preventDefault();

    const newHog = {
      name: name.trim(),
      specialty: specialty.trim(),
      weight: Number(weight),
      greased: Boolean(greased),
      highestMedalAchieved,
      image: image.trim(),
    };

    setHogs((prev) => [...prev, newHog]);

    // reset fields
    setName("");
    setWeight("");
    setSpecialty("");
    setGreased(false);
    setHighestMedalAchieved("bronze");
    setImage("");
  }

  const hogsToDisplay = useMemo(() => {
    let result = hogs.filter((hog) => !hiddenByName[hog.name]);

    if (showGreasedOnly) {
      result = result.filter((hog) => hog.greased === true);
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "weight") {
        return Number(a.weight) - Number(b.weight);
      }
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [hogs, hiddenByName, showGreasedOnly, sortBy]);

  return (
    <div className="App">
      <Nav />

      <div className="ui container" style={{ marginTop: "1rem" }}>
        {/* FILTER + SORT CONTROLS */}
        <div className="ui segment">
          <div className="ui form">
            <div className="two fields">
              <div className="field">
                {/* exact label text expected */}
                <label htmlFor="greasedOnly">Greased Pigs Only?</label>
                <input
                  id="greasedOnly"
                  type="checkbox"
                  checked={showGreasedOnly}
                  onChange={handleGreasedFilterChange}
                />
              </div>

              <div className="field">
                {/* exact label text expected */}
                <label htmlFor="sortBy">Sort by:</label>
                <select id="sortBy" value={sortBy} onChange={handleSortChange}>
                  <option value="name">name</option>
                  <option value="weight">weight</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ADD HOG FORM */}
        <div className="ui segment">
          <form className="ui form" onSubmit={handleAddHog}>
            <div className="three fields">
              <div className="field">
                <label htmlFor="hogName">Name:</label>
                <input
                  id="hogName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="hogWeight">Weight:</label>
                <input
                  id="hogWeight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="hogSpecialty">Specialty:</label>
                <input
                  id="hogSpecialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
              </div>
            </div>

            {/* extra fields */}
            <div className="three fields">
              <div className="field">
                <label htmlFor="hogGreased">Greased?</label>
                <input
                  id="hogGreased"
                  type="checkbox"
                  checked={greased}
                  onChange={(e) => setGreased(e.target.checked)}
                />
              </div>

              <div className="field">
                <label htmlFor="hogMedal">Highest Medal Achieved</label>
                <select
                  id="hogMedal"
                  value={highestMedalAchieved}
                  onChange={(e) => setHighestMedalAchieved(e.target.value)}
                >
                  <option value="bronze">bronze</option>
                  <option value="silver">silver</option>
                  <option value="gold">gold</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="hogImage">Image</label>
                <input
                  id="hogImage"
                  placeholder="/images/babe.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>

            <button className="ui primary button" type="submit">
              Add Hog
            </button>
          </form>
        </div>

        {/* HOG CARDS */}
        <div className="ui three stackable cards">
          {hogsToDisplay.map((hog) => {
            const showDetails = !!expandedByName[hog.name];

        
            const hogSpecialty = hog.specialty ?? hog["specialty"];
            const hogMedal =
              hog.highestMedalAchieved ??
              hog["highest medal achieved"] ??
              hog.highest_medal_achieved;

            return (
              <div key={hog.name} aria-label="hog card" className="ui card">
                <div
                  className="image"
                  onClick={() => toggleDetails(hog.name)}
                  style={{ cursor: "pointer" }}
                >
                  <img alt={"Photo of " + hog.name} src={hog.image} />
                </div>

                <div
                  className="content"
                  onClick={() => toggleDetails(hog.name)}
                  style={{ cursor: "pointer" }}
                >
                  <h3>{hog.name}</h3>
                </div>

                {showDetails ? (
                  <div className="content">
                    {/* IMPORTANT: single text nodes to match tests */}
                    <p>{`Specialty: ${hogSpecialty}`}</p>
                    <p>{hog.weight}</p>
                    <p>{hog.greased ? "Greased" : "Not Greased"}</p>
                    <p>{hogMedal}</p>
                  </div>
                ) : null}

                <div className="extra content">
                  <button className="ui button" onClick={() => hideHog(hog.name)}>
                    Hide Me
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
