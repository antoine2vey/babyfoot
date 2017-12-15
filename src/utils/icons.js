import { PixelRatio } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const navIconSize =
  __DEV__ === false && Platform.OS === 'android'
    ? PixelRatio.getPixelSizeForLayoutSize(40)
    : 40
const replaceSuffixPattern = /--(active|big|small|very-big)/g
const icons = {
  'ios-football-outline': [30],
  'ios-football': [30],
  'ios-contact-outline': [30],
  'ios-contact': [30],
  'ios-stats': [30],
  'ios-stats-outline': [30],
  'ios-search': [30],
  'ios-arrow-round-down': [navIconSize],
  'ios-close': [40]
}

const iconsMap = {}
const iconsLoaded = new Promise((resolve, reject) => {
  Promise.all(
    Object.keys(icons).map(iconName =>
      Ionicons.getImageSource(
        iconName.replace(replaceSuffixPattern, ''),
        icons[iconName][0],
        icons[iconName][1]
      )
    )
  )
    .then(sources => {
      Object.keys(icons).forEach(
        (iconName, idx) => (iconsMap[iconName] = sources[idx])
      )

      resolve(true)
    })
    .catch(err => console.log(err))
})

export { iconsMap, iconsLoaded }
