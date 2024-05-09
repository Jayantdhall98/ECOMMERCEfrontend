import React, { useEffect } from 'react'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

export default function Tawkto() {
  
    useEffect(() => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = 'https://embed.tawk.to/661101441ec1082f04df6a53/1hqp6pu0i';
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
  
      // Event listener to check when the script is loaded
      const onLoad = () => {
        console.log('Tawk.to script loaded');
      };
  
      // Attach the event listener
      script.addEventListener('load', onLoad);
  
      // Append the script to the document body
      document.body.appendChild(script);
  
      // Cleanup function to remove the script and event listener when the component unmounts
      return () => {
        script.removeEventListener('load', onLoad);
        document.body.removeChild(script);
      };
    }, []); // Empty dependency array ensures the effect runs only once
  
 
  
  return (
    <div>
        <div className="App">
            <TawkMessengerReact
                propertyId="661101431ec1082f04df6a47"
                widgetId="1hqp6ptad"/>
        </div>
    </div>
  )
}
