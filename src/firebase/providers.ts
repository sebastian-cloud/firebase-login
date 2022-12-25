import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { FirebaseAuth, FirebaseDB } from "./config";
import { LoginBody, RegisterBody, Task } from "./firebase.interface";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {

    try {
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
        

    } catch (error: any) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
    
        return {
            ok: false,
            errorMessage,
        }
    }

}

export const registerUserWithEmailPassword = async ({ email, password, displayName }: RegisterBody) => {
    try {
        const resp = await createUserWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
        )

        const { uid, photoURL } = resp.user

        await updateProfile( FirebaseAuth.currentUser!, { displayName } )

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch ( error: any ) {
        return {
            ok: false,
            errorMessage: error.message
        }
    } 
}

export const signInWithEmailPassword = async({ email, password }: LoginBody) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error: any) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut()
}

export const getTasks = async ( uid: string ): Promise<Task[]> => {

    let tasks: Task[] = []
    const q = query( 
        collection( FirebaseDB, 'tasks' ), 
        orderBy('created_at', 'desc'),
        where( 'uid', '==', uid )
    )
    const querySnapShot = await getDocs( q )
    querySnapShot.forEach(( doc ) => {
        tasks.push({
            id:             doc.id,
            name:           doc.data().name,
            done:           doc.data().done,
            created_at:     doc.data().created_at
        })
    })

    return tasks
}

export const updateTask = async ( uid: string, task: Task ) => {

    const taskRef = doc( FirebaseDB, 'tasks', task.id )

    await setDoc( taskRef, { 
        name:           task.name, 
        done:           !task.done, 
        created_at:     task.created_at,
        uid 
    })
}

export const deleteTask = async ( id: string ) => {

    const taskRef = doc( FirebaseDB, 'tasks', id )

    await deleteDoc( taskRef )
}

export const addTask = async ( uid:string, name: string ) => {
    
    const docRef = await addDoc(collection(FirebaseDB, "tasks"), {
        uid,
        name,
        done: false,
        created_at: Date.now()
    });
}