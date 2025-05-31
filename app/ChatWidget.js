/*'use client';

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

  return null;
}

*/

'use client';
import { useEffect } from 'react';

export default function ChatWidget() {
  useEffect(() => {
    let script1, script2;

    function loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });
    }

    async function init() {
      try {
        script1 = await loadScript('https://cdn.botpress.cloud/webchat/v2.5/inject.js');
        script2 = await loadScript('https://files.bpcontent.cloud/2025/05/24/08/20250524081856-6WSXPJY9.js');

        if (window.botpressWebChat) {
          window.botpressWebChat.sendEvent({ type: 'show' });
        }
      } catch (err) {
        console.error('Error loading Botpress:', err);
      }
    }

    init();

    return () => {
      if (script1) document.body.removeChild(script1);
      if (script2) document.body.removeChild(script2);
    };
  }, []);

  return null;
}
