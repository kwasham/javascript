import { useContext } from 'react';
import { AuthContext } from '../contexts/web3-context.js';

export const useAuth = () => useContext(AuthContext);
