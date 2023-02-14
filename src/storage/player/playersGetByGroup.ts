import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'

import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function playersGetByGroup(group: string) {
  try {
    const storage = await AsyncStorage.getItem(`@ignite-teams:player-${group}`)

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : []

    return players
  } catch (error) {
    throw new AppError('Erro')
  }
}
