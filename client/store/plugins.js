import { LOCAL_STORAGE_KEY } from '../constants';

const localStoragePlugin = (store) => {
  store.subscribe((mutation, state) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  });
};


export default [localStoragePlugin];
