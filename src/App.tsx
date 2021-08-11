import React, { useEffect, useState } from 'react';
import './App.css';
import transform from './utils';


function App() {
  const [text, setText] = useState('test');

  useEffect(() => {

  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <p>{transform(text)}</p>
      </header>
    </div>
  );
}

export default App;
