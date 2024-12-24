import React, { useState, ChangeEvent } from 'react';
import axios from "axios";
import './App.css';

const App: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<string>('Copy');

  const handleShorten = async (): Promise<void> => {
    if (!originalUrl) {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post<{ shortened_url: string }>(
        "http://localhost:4000/shorten",
        {
          url: originalUrl,
        }
      );

      setShortenedUrl(response.data.shortened_url);
      setSuccessMessage('Success! Here\'s your short URL.');
      setError("");
    } catch (error: any) {
      setError(error.response?.data?.error || "Something went wrong.");
      setShortenedUrl("");
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (): void => {
    navigator.clipboard.writeText(shortenedUrl).then(() => {
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus("Copy"), 2000);
    })
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setOriginalUrl(e.target.value);
  };

  return (
    <div className='container'>
      <h1>URL Shortener</h1>
      <h4>Enter the URL to shorten</h4>
      <h4>URL:</h4>
      <input
        type="text"
        className='original-url-input'
        placeholder="Enter your URL here"
        value={originalUrl}
        onChange={handleInputChange}
      />
      <button
        onClick={handleShorten}
        disabled={loading}
        className='shorten-button'
      >
        {loading ? (
          <span>Loading...</span>
        ) : (
          'Shorten'
        )}
      </button>

      {error && <p className='error-block'>{error}</p>}

      {successMessage && (
        <p className='success-block'>{successMessage}</p>
      )}

      {shortenedUrl && (
        <div className='bottom-block'>
          <a href={shortenedUrl} className='shortened-url-a'>{shortenedUrl}</a>
          <button
            className='copy-button'
            onClick={handleCopy}
          >
            {copyStatus}
          </button>
        </div>
      )
      }
    </div >
  );
};

export default App;
