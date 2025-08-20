import { useState, useEffect } from 'react';

export type Variant = 'control' | 'treatment';

export const useABTest = (experimentName: string): Variant => {
  const [variant, setVariant] = useState<Variant>('control');

  useEffect(() => {
    // This effect runs only on the client side
    const key = `ab_test_${experimentName}`;
    let savedVariant = localStorage.getItem(key) as Variant | null;

    if (!savedVariant) {
      savedVariant = Math.random() < 0.5 ? 'control' : 'treatment';
      localStorage.setItem(key, savedVariant);
    }
    
    setVariant(savedVariant);
  }, [experimentName]);

  return variant;
};
