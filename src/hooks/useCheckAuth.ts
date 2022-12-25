import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { FirebaseAuth } from '../firebase/config';
import { RootState } from '../store';
import { login, logout } from '../store/auth/AuthSlice';



export const useCheckAuth = () => {
  
    const { status } = useSelector((state: RootState) => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
        
        onAuthStateChanged( FirebaseAuth, async( user ) => {
        if ( !user ) return dispatch( logout( null ) );

        const { uid, email, displayName, photoURL } = user;
        dispatch( login( { uid, email, displayName, photoURL } as any ) );
        })
        
    }, []);

    return status;
}