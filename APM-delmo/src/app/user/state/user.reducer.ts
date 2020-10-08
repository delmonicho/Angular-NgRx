import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../state/user.actions';
import { UserState } from '../state';

// Define user initial state
const initialState: UserState = {
    maskUserName: true,
    currentUser: null
};

// Reducer uses strongly typed state
// HW3: modify the reducer to handle the strongly typed action
// HW4:
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
