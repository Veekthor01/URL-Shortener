'use client';
import createShortUrl from "./URL/page";
import React, { useState } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import UrlPage from "./Text/page";
import Footer from "./Footer/page";
import './tooltip.css';

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");

  const shortenLongUrl = async () => {
    try {
      const shortenedUrl = await createShortUrl(longUrl, customUrl);
      setShortUrl(shortenedUrl);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };  

const handleCopy = () => {
  setIsCopied(true);
  setTimeout(() => {
    setIsCopied(false);
  }, 2000);
};

  return (
    <main className="mt-8 min-h-screen">
      <div className="text-center text-3xl md:text-4xl font-bold text-blue-500">
        <h1>SHORT<span className="text-slate-700">LY</span></h1>
      </div>

      <div className="w-4/5 mx-auto flex flex-col justify-center items-center mt-5 bg-white rounded-md shadow-md">
      <div className="text-center text-2xl md:text-3xl mt-3 font-bold text-slate-700">
        <h2>Paste the long URL to shorten it</h2>
      </div>
    <div className="w-full flex flex-row justify-center items-center my-4">
    <input
      type="text"
      placeholder="Enter Long URL"
      value={longUrl}
      onChange={(e) => setLongUrl(e.target.value)}
      className="w-4/5 px-4 py-3 border rounded-sm border-gray-400 focus:outline-blue-500 placeholder-slate-500"/>
   </div>

   <div className="text-left md:text-center text-lg mt-3 mb-3">
      {error && <div className="text-red-500">{error}</div>}
        </div>

   <div className="w-full flex flex-col">
  <div className="w-full flex flex-col md:flex-row justify-center items-center my-4">
    <div className="w-full md:w-2/5 pr-2 text-center">
      <h3 className="text-lg md:text-xl text-gray-700">URL Domain</h3>
      <input
        type="text"
        placeholder="https://shortly.com/"
        className="w-4/5 md:w-3/4 px-4 py-3 border rounded-sm border-gray-400 focus:outline-none placeholder-slate-500" readOnly/>
    </div>
    <div className="w-full md:w-1/2 pl-2 mt-5 md:mt-0">
    <div className="text-center text-lg md:text-xl">
      <div className="flex items-center justify-center">
        <h3 className="text-gray-700">Enter a custom URL (optional)</h3>
        <span className="tooltip">?</span>
        <div className="tooltip-text">
          Add your own words as the short link (e.g., "shortly/my_brand" instead of "shortly/XwKt8QJk")
          </div>
      </div>
    </div>
      <div className="w-full flex flex-row justify-center items-center">
        <input
          type="text"
          placeholder="Enter Custom URL"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          className="w-4/5 px-4 py-3 border rounded-sm border-gray-400 focus:outline-blue-500 placeholder-slate-500"/>
      </div>
    </div>
  </div>
</div>

<div className="mt-5">
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 md:py-3 md:px-4 rounded-sm"
      onClick={shortenLongUrl}>Shorten URL</button>
</div>

<div className="text-center text-lg md:text-xl mt-5 text-gray-700">
        <h2>Shortened URL</h2>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center mb-4">
        <input
          type="text"
          placeholder="Shortened URL"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          className="w-4/5 md:w-2/5 px-4 py-3 border rounded-sm border-gray-400 focus:outline-blue-500 placeholder-slate-500" readOnly pointerEvents="auto"/>
           <CopyToClipboard text={shortUrl} onCopy={handleCopy}>  
        <button onClick={handleCopy} className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 md:mt-0 py-2 px-3 md:py-3 md:px-4 rounded-sm">
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
        </CopyToClipboard>
      </div>
      </div>
      <UrlPage />
      <Footer />
    </main>
  );
}
