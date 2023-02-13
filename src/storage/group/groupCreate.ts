import AsyncStorage from '@react-native-async-storage/async-storage'
import { groupsGetAll } from './groupsGetAll'

export async function groupCraete(groupName: string) {
  try {
    const storedGroups = await groupsGetAll()

    const storage = JSON.stringify([...storedGroups, groupName])
    await AsyncStorage.setItem('@ignite-teams:groups', storage)
  } catch (error) {
    throw new Error('Error trying to create a new group')
  }
}
