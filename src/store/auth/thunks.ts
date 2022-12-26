import { useSelector } from 'react-redux';
import { LoginBody, RegisterBody, EditProfileBody } from '../../firebase/firebase.interface';
import { logoutFirebase, registerUserWithEmailPassword, signInWithEmailPassword, singInWithGoogle, updateDisplayName } from '../../firebase/providers';
import { checkingCredentials, login, logout, updateName } from './AuthSlice'
import { RootState } from '../index';

export const startRegisterUserWithEmailPassword = (params: RegisterBody) => {

    return async ( dispatch: any ) => {

        const result = await registerUserWithEmailPassword( params )
        if( !result.ok ) return dispatch( logout( result ) );

        setTimeout(() => {
            
            dispatch( login( result as any ) )
        }, 4000);
    }
}

export const startLoginWithEmailPassword = ({ email, password }: LoginBody) => {
    return async( dispatch: any ) => {

        const result = await signInWithEmailPassword({ email, password });

        if ( !result.ok ) return dispatch( logout( result ) );

        dispatch( checkingCredentials() );

        setTimeout(() => {
            
            dispatch( login( result as any ));
        }, 1000);

    }
}

export const startGoogleSignIn = ( setGoogleSubmitting: any) => {
    return async( dispatch: any ) => {

        dispatch( checkingCredentials() );

        const result = await singInWithGoogle();
        setGoogleSubmitting( false )
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result as any ))

    }
}

export const startLogout = () => {
    return async ( dispatch: any ) => {

        await logoutFirebase()

        dispatch( logout( null ) )
    }
}

export const startUpdateDisplayName = (displayName: string) => {
    return async ( dispatch: any ) => {

        const resp = await updateDisplayName( displayName );

        if( !resp.ok ) return;
        
        dispatch( updateName( displayName ) )
    }
}