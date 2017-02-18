import { LOCAL_STORAGE_KEY } from '../constants';

const localStoragePlugin = (store) => {
  store.subscribe((mutation, { tracks }) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tracks));
  });
};


export default [localStoragePlugin];
