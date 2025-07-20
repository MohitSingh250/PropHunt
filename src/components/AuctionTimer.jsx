import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

export function AuctionTimer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isEndingSoon, setIsEndingSoon] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const end = new Date(endTime);
      const distance = end - now;
      
      setIsEndingSoon(distance < 3600000); // Less than 1 hour
      setTimeLeft(formatDistanceToNow(end, { addSuffix: true }));
    };
    
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div style={{
      fontSize: '0.875rem',
      color: isEndingSoon ? '#ef4444' : '#64748b',
      fontWeight: isEndingSoon ? '500' : 'normal'
    }}>
      Ends {timeLeft}
    </div>
  );
}
export default AuctionTimer;