import React from 'react';
import './App.css'
import { Telegram } from "@twa-dev/types";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

function App() {
  const [titolo, setTitolo] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tag, setTag] = React.useState('steemit steemexclusive');
  //const [dateTime, setDateTime] = React.useState('');
  // const [initData, setInitData] = useState('');

  const inviaMessaggio = (): void => {
    const post = {
        title: titolo,
        description: description,
        tag: tag
        //dateTime: dateTime
    }
    window.Telegram.WebApp.sendData(JSON.stringify(post));
};

React.useEffect(() => {
  const savedTags = localStorage.getItem('tags');
  if (savedTags) {
    setTag(savedTags);
  }
  const savedTitle = localStorage.getItem('title');
  if (savedTitle) {
      setTitolo(savedTitle);
  }
  const savedDescription = localStorage.getItem('description');
  if (savedDescription) {
      setDescription(savedDescription);
  }
 // const savedDateTime = localStorage.getItem('dateTime');
  //  if (savedDateTime) {
  //    setDateTime(savedDateTime);
 // }
}, []);
  
React.useEffect(() => {
    localStorage.setItem('title', titolo);
}, [titolo]);

React.useEffect(() => {
    localStorage.setItem('description', description);
}, [description]);
  
React.useEffect(() => {
  localStorage.setItem('tags', tag);
}, [tag]);

  return (
    <>
      <div className="container">
      {/* Casella della community
      <input
        type="text"
        placeholder={initData}
        className="input-community"
        value={initData}
        onChange={(e) => setInitData(e.target.value)}
      /> */}
      {/* Casella di input per il titolo */}
      <input
        type="text"
        placeholder="Title"
        className="input-title"
        value={titolo}
        onChange={(e) => setTitolo(e.target.value)}
      />
      {/* Casella di input per la descrizione */}
      <textarea
        placeholder="body of post"
        className="input-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={15000}
      />
      {/* Casella di input per i tag */}
      <input
        type="text"
        placeholder="Tag exaple: steem steemit steemexclusive"
        className="input-tag"
        value={tag}
        onChange={(e) => {
          const inputWords = e.target.value.split(' ');
          if (inputWords.length <= 7) {
            setTag(e.target.value);
          }
        }}
      />
      //<input 
      //  type="datetime-local" 
      //  className="input-datetime" 
     //   value={dateTime} 
     //   onChange={(e) => setDateTime(e.target.value)} 
      //>  
      {/* Bottone di invio post */}
      <button className="button" onClick={inviaMessaggio}>Send Post</button>
    </div>
    </>
  )
}

export default App
