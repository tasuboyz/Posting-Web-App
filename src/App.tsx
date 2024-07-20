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
  const [tag, setTag] = React.useState('');
  // const [initData, setInitData] = useState('');

  const inviaMessaggio = (): void => {
    const post = {
        title: titolo,
        description: description,
        tag: tag
    }
    window.Telegram.WebApp.sendData(JSON.stringify(post));
};

React.useEffect(() => {
  const savedTags = localStorage.getItem('tags');
  if (savedTags) {
    setTag(savedTags);
  }
}, []);

React.useEffect(() => {
  localStorage.setItem('tags', tag);
}, [tag]);
// useEffect(() => {
//   // Assumendo che window.Telegram.WebApp.initData sia disponibile
//   if (window.Telegram && window.Telegram.WebApp) {
//     window.Telegram.WebApp.showAlert(window.Telegram.WebApp.initData)
//     setInitData(window.Telegram.WebApp.initData);
//   }
// }, []);

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
        placeholder="Scrivi qui il titolo"
        className="input-title"
        value={titolo}
        onChange={(e) => setTitolo(e.target.value)}
      />
      {/* Casella di input per la descrizione */}
      <textarea
        placeholder="Scrivi qui il corpo del post (Max 1500)"
        className="input-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={1500}
      />
      {/* Casella di input per i tag */}
      <input
        type="text"
        placeholder="Scrivi qui i tag exaple: steem steemit steemexclusive"
        className="input-tag"
        value={tag}
        onChange={(e) => {
          const inputWords = e.target.value.split(' ');
          if (inputWords.length <= 7) {
            setTag(e.target.value);
          }
        }}
      />
      {/* Bottone di invio post */}
      <button className="button" onClick={inviaMessaggio}>Invia Post</button>
    </div>
    </>
  )
}

export default App
