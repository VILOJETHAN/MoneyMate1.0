/*
import React from 'react'
 

function page() {
  return (
    <div>Your Chat Page here </div>
  )
}


export default page

*/

// Example: pages/chat.tsx or components/ChatWidget.tsx


'use client'
import { useEffect } from 'react';

export default function ChatWidget() {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.5/inject.js';
    script1.async = true;

    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/05/24/08/20250524081856-6WSXPJY9.js';
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null; // This component just injects the script
}