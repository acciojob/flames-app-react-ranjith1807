import React, { useState } from 'react';
import './../styles/App.css'
function FlamesApp() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');

  const calculateRelationship = () => {
    // Handle blank inputs
    if (!name1.trim() || !name2.trim()) {
      setResult('Please Enter valid input');
      return;
    }

    // Convert second name to an array to easily find and remove matching characters
    let name2Array = name2.split('');
    let commonCharactersCount = 0;

    // Iterate through the first name to find common characters
    for (let char of name1) {
      const matchIndex = name2Array.indexOf(char);
      if (matchIndex !== -1) {
        commonCharactersCount++;
        // Remove the matched character so it isn't counted again
        name2Array.splice(matchIndex, 1); 
      }
    }

    // Total length minus the common characters from BOTH strings
    const remainingLength = (name1.length + name2.length) - (2 * commonCharactersCount);
    const resultIndex = remainingLength % 6;

    // Output Conditions Mapping
    const relationshipMap = {
      0: "Siblings",
      1: "Friends",
      2: "Love",
      3: "Affection",
      4: "Marriage",
      5: "Enemy"
    };

    setResult(relationshipMap[resultIndex]);
  };

  const clearFields = () => {
    setName1('');
    setName2('');
    setResult('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <input
        type="text"
        data-testid="input1"
        name="name1"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
        placeholder="Enter first name"
        style={{ marginRight: '5px' }}
      />
      
      <input
        type="text"
        data-testid="input2"
        name="name2"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
        placeholder="Enter second name"
        style={{ marginRight: '5px' }}
      />
      
      <button
        data-testid="calculate_relationship"
        name="calculate_relationship"
        onClick={calculateRelationship}
        style={{ marginRight: '5px' }}
      >
        Calculate Relationship Future
      </button>
      
      <button
        data-testid="clear"
        name="clear"
        onClick={clearFields}
      >
        Clear
      </button>

      {/* Conditionally render the h3 only if there is a result */}
      {result && (
        <h3 data-testid="answer">{result}</h3>
      )}
    </div>
  );
}

export default FlamesApp;