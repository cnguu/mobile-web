import autoprefixer from 'autoprefixer'
import pxToRem from 'postcss-pxtorem'

export default {
  plugins: [
    autoprefixer({
      overrideBrowserslist: ['Chrome >= 49', 'Android >= 6'],
    }),
    pxToRem({
      rootValue: 37.5,
      propList: ['*'],
      selectorBlackList: ['.q-', '.vue-devtools'],
      minPixelValue: 2,
    }),
  ],
}
