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

  const inviaMessaggio = (): void => {
    const post = {
        title: titolo,
        description: description,
        tag: tag
    }
    window.Telegram.WebApp.sendData(JSON.stringify(post));
};

  return (
    <>
      <div className="container">
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
        placeholder="Scrivi qui il corpo del post"
        className="input-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* Casella di input per i tag */}
      <input
        type="text"
        placeholder="Scrivi qui i tag"
        className="input-tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      {/* Bottone di invio post */}
      <button className="button" onClick={inviaMessaggio}>Invia Post</button>
    </div>
    </>
  )
}

export default App
