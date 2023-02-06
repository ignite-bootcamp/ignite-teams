/* eslint-disable camelcase */
import { ThemeProvider } from 'styled-components/native'
import { Groups } from './src/screens/groups'
import theme from '@theme/index'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { Loading } from '@components/Loading'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      {fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  )
}
