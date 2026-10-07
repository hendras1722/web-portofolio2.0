import { useLoadingSplashScreen } from "~/composable/use-loading";

export default defineNuxtPlugin((nuxtApp) => {
  const showSignatureSplash = useLoadingSplashScreen()


  nuxtApp.hook('app:error', () => {
    showSignatureSplash.value = false;
  });

  nuxtApp.hook('app:chunkError', () => {
    showSignatureSplash.value = false;
  });

  nuxtApp.hook('app:error:cleared', () => {
    showSignatureSplash.value = false;
  });
});
