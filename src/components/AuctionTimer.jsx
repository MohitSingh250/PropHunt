import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

export function AuctionTimer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const update = () => setTimeLeft(formatDistanceToNow(new Date(endTime), { addSuffix: true }));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return <div className="text-sm text-muted-foreground">Ends {timeLeft}</div>;
}