import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'
import { playersGetByGroup } from './playersGetByGroup'

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await playersGetByGroup(group)

    const filteredStorage = storage.filter(
      (player) => player.name !== playerName,
    )

    const players = JSON.stringify(filteredStorage)
    await AsyncStorage.setItem(`@ignite-teams:players-${group}`, players)
  } catch (error) {
    throw new AppError('playerRemoveByGroup: erro ao remover jogador do grupo ')
  }
}
