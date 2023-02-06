import theme from '@theme/index'
import 'styled-components'

declare module 'styled-components' {
  type Theme = typeof theme

  export interface DefaultTheme extends Theme {}
}
