import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ProductState } from 'src/app/products/state/product.reducer';
import { User } from '../user';
import * as UserActions from '../state/user.actions';

// Strongly type the user state
export interface UserState {
    maskUserName: boolean;
    currentUser: User;
}

// Define user initial state
const initialState: UserState = {
    maskUserName: true,
    currentUser: null
};

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

// Reducer uses strongly typed state
// HW3: modify the reducer to handle the strongly typed action
// TODO: HW4: 
    // - update the login component to use an async pipe
    // - add a maskUserName$ variable in the component
    // - subscribe in the template with an async pipe
export const userReducer = createReducer<UserState>(
    initialState,
    on(UserActions.toggleMaskUserName, (state): UserState => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            maskUserName: !state.maskUserName
        };
    })
);
