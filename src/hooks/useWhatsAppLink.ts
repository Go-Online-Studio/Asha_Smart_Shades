import { useState, useEffect } from 'react';

export function useWhatsAppLink(phoneNumber: string) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const getWhatsAppUrl = (message: string = '') => {
    const baseUrl = isMobile ? 'https://api.whatsapp.com/send' : 'https://web.whatsapp.com/send';
    const encodedMessage = encodeURIComponent(message);
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    return `${baseUrl}?phone=${cleanPhone}${message ? `&text=${encodedMessage}` : ''}`;
  };

  return { getWhatsAppUrl };
}
