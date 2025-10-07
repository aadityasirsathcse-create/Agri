
import { combineReducers } from 'redux';
import qrTrackerReducer from './plugins/qr-tracker/reducers/qrTrackerReducer';

const rootReducer = combineReducers({
  qrTracker: qrTrackerReducer,
});

export default rootReducer;
