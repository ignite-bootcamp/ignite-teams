import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'

import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string,
) {
  try {
    await AsyncStorage.setItem(`@ignite-teams:player-${group}`, '')
  } catch (error) {
    throw new AppError('')
  }
}
