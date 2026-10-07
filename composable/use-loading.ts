export const useLoadingSplashScreen =()=>{
  return useState<boolean>('showSignatureSplash', () => true)
}
