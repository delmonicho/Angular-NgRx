import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';

/* HW 5:
    - Add an index.ts file to the User state folder
    - Copy the State interface and selectors to the index.ts file
    - Add back any missing import statements
    - Change any files import statements that use the state interface or selectors
*/
// Strongly type the user state
export interface UserState {
    maskUserName: boolean;
    currentUser: User;
}

// Build selectors for maskUserName and currentUser
const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);
