import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0); 
  const [countA, setCountA] = useState(0); 
  const [countN, setCountN] = useState(0); 
  const [countK, setCountK] = useState(0); 
  const [selectedName, setSelectedName] = useState("alfiya"); 
  const [votes, setVotes] = useState({ alfiya: [], naina: [], karan: [] }); 

  const nameHandler = (e) => {
    setSelectedName(e.target.value);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    const voterName = e.target.elements["voter-name"].value.trim(); 

    if (!voterName) return alert("Please enter a voter name!");

    setVotes((prevVotes) => ({
      ...prevVotes,
      [selectedName]: [...prevVotes[selectedName], voterName],
    }));

    if (selectedName === "alfiya") {
      setCountA(countA + 1);
    } else if (selectedName === "naina") {
      setCountN(countN + 1);
    } else if (selectedName === "karan") {
      setCountK(countK + 1);
    }

    setCount(count + 1); 
    e.target.reset(); 
  };

  const deleteHandler = (monitor, voter) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [monitor]: prevVotes[monitor].filter((name) => name !== voter), 
    }));

 
    if (monitor === "alfiya") {
      setCountA(countA - 1);
    } else if (monitor === "naina") {
      setCountN(countN - 1);
    } else if (monitor === "karan") {
      setCountK(countK - 1);
    }

    setCount(count - 1); 
  };

  return (
    <>
      <form onSubmit={SubmitHandler}>
        <div className="heading">
          <h1>Class Monitor Vote</h1>
          <p>Total Votes: {count}</p>
        </div>

        <div className="content">
          <label htmlFor="voter-name">Voter Name:</label>
          <input id="voter-name" type="text" placeholder="Enter your name" />

          <label htmlFor="monitor">Choose Monitor:</label>
          <select id="monitor" value={selectedName} onChange={nameHandler}>
            <option value="alfiya">Alfiya</option>
            <option value="naina">Naina</option>
            <option value="karan">Karan</option>
          </select>

          <button type="submit">Add Vote</button>
        </div>
      </form>

      <div className="votes">
        <h1>Alfiya</h1>
        <p>Total Votes: {countA}</p>
        <ul>
          {votes.alfiya.map((voter, index) => ( 
            <li key={index}>
              {voter} <button onClick={() => deleteHandler("alfiya", voter)}>Delete</button>
            </li>
          ))}
        </ul>

        <h1>Naina</h1>
        <p>Total Votes: {countN}</p>
        <ul>
          {votes.naina.map((voter, index) => (
            <li key={index}>
              {voter} <button onClick={() => deleteHandler("naina", voter)}>Delete</button>
            </li>
          ))}
        </ul>

        <h1>Karan</h1>
        <p>Total Votes: {countK}</p>
        <ul>
          {votes.karan.map((voter, index) => (
            <li key={index}>
              {voter} <button onClick={() => deleteHandler("karan", voter)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
