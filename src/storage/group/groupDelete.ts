import AsyncStorage from '@react-native-async-storage/async-storage'
import { groupsGetAll } from './groupsGetAll'

export async function groupDelete(groupName: string) {
  try {
    const storedGroups = await groupsGetAll()
    const groups = storedGroups.filter((group) => group !== groupName)
    await AsyncStorage.setItem('@ignite-teams:groups', JSON.stringify(groups))

    await AsyncStorage.removeItem(`@ignite-teams:player-${groupName}`)
  } catch (error) {
    console.error(error)
  }
}
