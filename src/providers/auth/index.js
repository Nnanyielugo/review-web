import { useContext } from 'react';
import Context from './context';

export { default } from './provider';

export function useAuth() {
  return useContext(Context);
}
