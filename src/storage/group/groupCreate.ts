import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'
import { groupsGetAll } from './groupsGetAll'

export async function groupCraete(groupName: string) {
  try {
    const storedGroups = await groupsGetAll()

    const groupAlreadyExists = storedGroups.includes(groupName)

    if (groupAlreadyExists) {
      throw new AppError('Already exist a group with this name')
    }

    const storage = JSON.stringify([...storedGroups, groupName])
    await AsyncStorage.setItem('@ignite-teams:groups', storage)
  } catch (error) {
    throw new AppError('Error trying to create a new group')
  }
}
