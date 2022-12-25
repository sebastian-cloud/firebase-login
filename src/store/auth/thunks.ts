import { LoginBody, RegisterBody } from '../../firebase/firebase.interface'
import { logoutFirebase, registerUserWithEmailPassword, signInWithEmailPassword, singInWithGoogle } from '../../firebase/providers'
import { checkingCredentials, login, logout } from './AuthSlice'

export const startRegisterUserWithEmailPassword = (params: RegisterBody) => {
    return async ( dispatch: any ) => {

        const result = await registerUserWithEmailPassword( params )
        if( !result.ok ) return dispatch( logout( result ) );

        setTimeout(() => {
            
            dispatch( checkingCredentials() );
        }, 1000);

        dispatch( login( result as any ) )
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