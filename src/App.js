import { useState } from "react";
import "./index.css";

const choices = [
  { text: "Dissatisfied", amt: 0 },
  { text: "It was okay", amt: 0.05 },
  { text: "It was good", amt: 0.15 },
  { text: "Absolutely amazing!", amt: 0.2 },
];

function BillInput({ amt, changeHandler, children }) {
  return (
    <div>
      <label>
        {children}
        <input
          type="number"
          name="billamt"
          step={0.01}
          value={amt + 0.0}
          style={{ marginLeft: "5px" }}
          onChange={changeHandler}
        ></input>
      </label>
    </div>
  );
}

function SelectPercentage({ choices, children, updateHandler, value, ind }) {
  return (
    <label>
      {children}
      <select
        value={value}
        onChange={(el) => updateHandler(ind, parseFloat(el.target.value))}
        style={{ marginLeft: "5px" }}
      >
        {choices.map((e) => (
          <option value={e.amt} key={e.text}>
            {`${e.text} (${e.amt * 100}%)`}
          </option>
        ))}
      </select>
    </label>
  );
}

function BillOutput({ children }) {
  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
}

function ReuasableButton({ clickFunc, children }) {
  return (
    <button onClick={clickFunc} style={{ cursor: "pointer" }}>
      {children}
    </button>
  );
}

function App() {
  const [billAmt, setBillAmt] = useState(0);
  const [qualityPrefs, setQualityPrefs] = useState([0.15]);

  function handleAddFriend() {
    setQualityPrefs([...qualityPrefs, 0.15]);
  }

  function handleDeleteFriend(id) {
    setQualityPrefs(qualityPrefs.filter((_, index) => index !== id));
  }

  function handleUpdateQuality(id, newVal) {
    setQualityPrefs(
      qualityPrefs.map((val, ind) => (id === ind ? newVal : val))
    );
  }

  function handleReset() {
    setQualityPrefs([0.15]);
    setBillAmt(0);
  }

  const average = (list) =>
    list.reduce((prev, curr) => prev + curr) / list.length;

  return (
    <div className="App">
      <BillInput
        amt={billAmt}
        changeHandler={(e) => setBillAmt(parseFloat(e.target.value))}
      >
        How much was the bill?
      </BillInput>
      {qualityPrefs.map((el, ind) => (
        <div key={ind}>
          <SelectPercentage
            choices={choices}
            value={el}
            updateHandler={handleUpdateQuality}
            ind={ind}
          >
            {ind === 0
              ? "How did you like the service?"
              : `How did Friend ${ind} like the service?`}
          </SelectPercentage>
          {ind > 0 ? (
            <span
              onClick={() => handleDeleteFriend(ind)}
              style={{ cursor: "pointer", marginLeft: "5px" }}
            >
              🗑
            </span>
          ) : (
            ""
          )}
        </div>
      ))}
      <ReuasableButton clickFunc={handleAddFriend}>
        Add Friend ➕
      </ReuasableButton>
      <BillOutput>
        {`Pay $${(parseFloat(billAmt) * (average(qualityPrefs) + 1)).toFixed(
          2
        )} ($${parseFloat(billAmt).toFixed(2)} Bill + $${(
          billAmt * average(qualityPrefs)
        ).toFixed(2)} Tip)`}
      </BillOutput>
      <ReuasableButton clickFunc={handleReset}>Reset</ReuasableButton>
    </div>
  );
}

export default App;
