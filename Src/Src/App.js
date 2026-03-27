import React, { useState } from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import { psalmsData } from "./psalmsData";

function App() {
  const [chapter, setChapter] = useState(1);
  const [showOption, setShowOption] = useState("both");

  const current = psalmsData.find((p) => p.chapter === chapter);

  const changeChapter = (dir) => {
    let next = chapter + dir;
    if (next < 1) next = 1;
    if (next > psalmsData.length) next = psalmsData.length;
    setChapter(next);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Tehillim Crib Notes</h1>
      <h2>Psalm {current.chapter}</h2>

      <Select
        options={[
          { value: "rashi", label: "Rashi only" },
          { value: "radak", label: "Radak only" },
          { value: "both", label: "Both" },
        ]}
        value={{ value: showOption, label: showOption }}
        onChange={(opt) => setShowOption(opt.value)}
      />

      <ul>
        <li><strong>Summary:</strong> {current.summary}</li>
        {(showOption === "rashi" || showOption === "both") && <li><strong>Rashi:</strong> {current.rashi}</li>}
        {(showOption === "radak" || showOption === "both") && <li><strong>Radak:</strong> {current.radak}</li>}
        <li><strong>Takeaway:</strong> {current.main_takeaway}</li>
        {current.extra && <li><strong>Extra:</strong> {current.extra}</li>}
      </ul>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => changeChapter(-1)}>◀ Previous</button>
        <button onClick={() => changeChapter(1)} style={{ marginLeft: 10 }}>Next ▶</button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
