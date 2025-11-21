"use client";

import { useState } from "react";
import "./homepageStyles.css";
import {
  API_URL,
  BASE_URL,
  COPY_SUCCESS_TIMEOUT,
  PLACEHOLDER_TEXT,
  BUTTON_TEXT_SHORTEN,
  BUTTON_TEXT_COPY,
  BUTTON_TEXT_COPIED,
  CLEAR_BUTTON_TEXT,
  TITLE_TEXT,
} from "../../utilities/constants";

export default function Page() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ original: inputUrl }),
    });

    const data = await response.json();
    setShortUrl(data.short);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${BASE_URL}/${shortUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_SUCCESS_TIMEOUT);
  };

  return (
    <div className="app-container">
      <h1 className="title">{TITLE_TEXT}</h1>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="input-wrapper">
          <input
            className="input"
            placeholder={PLACEHOLDER_TEXT}
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          {inputUrl && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => setInputUrl("")}
            >
              {CLEAR_BUTTON_TEXT}
            </button>
          )}
        </div>
        <button type="submit" className="btn">
          {BUTTON_TEXT_SHORTEN}
        </button>
      </form>

      {shortUrl && (
        <div className="short-url">
          <span>{`${BASE_URL}/${shortUrl}`}</span>
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? BUTTON_TEXT_COPIED : BUTTON_TEXT_COPY}
          </button>
        </div>
      )}
    </div>
  );
}
