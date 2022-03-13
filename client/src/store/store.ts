import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import authReducer from './auth/reducer';
import employeesReducer from './employee/reducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';

const reducers = combineReducers({
  authPage: authReducer,
  employeePage: employeesReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default store;
