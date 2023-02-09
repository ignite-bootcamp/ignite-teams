import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Groups } from '@screens/Groups'
import { Players } from '@screens/Players'
import { NewGroup } from '@screens/NewGroup'

type StackRoutes = {
  groups: undefined
  new: undefined
  players: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<StackRoutes>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="groups" component={Groups} />

      <Screen name="new" component={NewGroup} />

      <Screen name="players" component={Players} />
    </Navigator>
  )
}
