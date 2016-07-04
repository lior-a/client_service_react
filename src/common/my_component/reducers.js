import * as constants from './constants';
import Immutable from 'Immutable';

const initialState = Immutable.fromJS({});

export default function (state = initialState, action = {}) {

	switch (action.type) {
		default:
			return state;
	}
}