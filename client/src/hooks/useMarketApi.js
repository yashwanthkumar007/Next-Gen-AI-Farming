// src/hooks/useMarketApi.js
import { useState, useCallback } from 'react';

export function useMarketApi() {
  const [cache, setCache] = useState({});

  const fetchData = useCallback(async (commodity, market) => {
    const cacheKey = `${commodity}-${market}`;
    
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    try {
      const response = await fetch(
        `https://api.agmarknet.gov.in/api/commodity/${commodity}`,
        {
          method: 'GET',
          params: { market },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }

      const data = await response.json();
      
      // Cache for 15 minutes
      setCache(prev => ({
        ...prev,
        [cacheKey]: {
          ...data,
          timestamp: Date.now(),
          expiry: Date.now() + (15 * 60 * 1000)
        }
      }));

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }, []);

  return { fetchData };
}