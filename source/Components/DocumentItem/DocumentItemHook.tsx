import {useState} from 'react';

export const useDocumentItemHook = () => {
  const [count, setCount] = useState<number>(0);

  return {
    count,
    setCount,
  };
};
