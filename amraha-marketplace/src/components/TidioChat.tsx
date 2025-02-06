
'use client'; 

import { useEffect } from 'react';

const TidioChat = () => {
  useEffect(() => {
    
    const script = document.createElement('script');
    script.src = "//code.tidio.co/2qutk36otay9ijtsqfhyscxdamgoc82d.js"; 
    script.async = true;

    
    document.body.appendChild(script);

    // Cleanup: Remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default TidioChat;