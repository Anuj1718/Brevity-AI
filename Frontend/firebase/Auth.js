import { auth, db } from './firebase';
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function signUpWithEmailAndPassword(email, password, name) {
    try {
        console.log('Starting signup process...');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created in Auth:', userCredential.user.uid);
        
        // Create user document in Firestore using v9 syntax
        try {
            console.log('Attempting to create user document in Firestore...');
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name: name,
                email: email,
                createdAt: new Date(),
                avatar: null
            });
            console.log('User document created successfully in Firestore');
        } catch (firestoreError) {
            console.error(' Error creating user document:', firestoreError);
            console.error('Error code:', firestoreError.code);
            console.error('Error message:', firestoreError.message);
            // Don't throw here - user is still created in Auth
        }
        
        return userCredential;
    } catch (error) {
        console.error('Signup error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        throw error;
    }
}

export async function signInWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signInWithGoogle = async() => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Check if user document exists, if not create one
    try {
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        if (!userDoc.exists()) {
            console.log('Creating new Google user document:', {
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            });
            
            await setDoc(doc(db, 'users', result.user.uid), {
                name: result.user.displayName || result.user.email?.split('@')[0] || 'User',
                email: result.user.email,
                createdAt: new Date(),
                avatar: result.user.photoURL || null
            });
            console.log('Google user document created successfully');
        } else {
            console.log('Google user document already exists');
        }
    } catch (error) {
        console.error('Error handling Google sign-in user document:', error);
    }
    
    return result;
}

export const signOutUser = async() => {
    return signOut(auth);
}

export const getUserProfile = async(uid) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return userDoc.data();
        }
        return null;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
}