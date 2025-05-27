/**
 * importing asset dynamically using variables
 * @param {string} path path of asset that will be imported without prefix /assets/
 * @example <img :src="useAsset(dynamic_image_name + '.svg')" alt="Discover Nuxt 3" />
 * @return imported file
 */
export default function useAsset (path: string): string {
  const assets = import.meta.glob(['~/assets/**/*', '!~/assets/css/**/*'], {
    eager : true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets[`/assets/${path}`]
}