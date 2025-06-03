// components/DownloadCVButton.jsx
import { useState } from 'react';

const DownloadCVButton = () => {
  const [status, setStatus] = useState('idle');

  const handleDownload = () => {
    setStatus('downloading');

    // simulate download time (3 sec)
    setTimeout(() => {
      setStatus('done');
    }, 3000);
  };

const getLabel = () => {
  if (status === 'downloading') return 'Downloading...';
  if (status === 'done') return 'Download complete';
  return 'Download CV';
};


  return (
    <a
      href="/Junaid Professional CV .pdf"
      download="Doctor-CV.pdf"
      onClick={handleDownload}
      className="px-0 lg:px-3 inline-block py-1 w-full shadow-xl lg:m-3 sm:w-fit rounded-full bg-violet-700 hover:bg-fuchsia-600 text-white mt-3 text-center"
    >
      {getLabel()}
    </a>
  );
};

export default DownloadCVButton;
