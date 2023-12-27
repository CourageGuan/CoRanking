import AV from 'leancloud-storage'

AV.init({
  appId: import.meta.env.VITE_LC_APP_ID,
  appKey: import.meta.env.VITE_LC_APP_KEY,
  serverURL: import.meta.env.VITE_LC_APP_SERVER_URL,
});

if (import.meta.env.MODE === 'development') {
    AV.debug.enable();
} else {
    AV.debug.disable();
}

export default AV;