// @flow
import { useState } from 'react';

export const useBoolState = (initialState: boolean = false) => {
  if (typeof initialState !== 'boolean') {
    throw new Error('invalid initialState');
  }

  const [state, setState] = useState<boolean>(initialState);
  
  const toggleState = () => {
    if (state) setState(false);
    else setState(true);
  };

  return [state, { setState, toggleState }];
}
