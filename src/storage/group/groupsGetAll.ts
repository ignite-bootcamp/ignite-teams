import AsyncStorage from '@react-native-async-storage/async-storage'

export async function groupsGetAll() {
  try {
    const storage = await AsyncStorage.getItem('@ignite-teams:groups')

    const groups: string[] = storage ? JSON.parse(storage) : []

    return groups
  } catch (error) {
    throw new Error('Error trying to get all groups')
  }
}
