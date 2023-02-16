import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { ListEmpty } from '@components/ListEmpty'
import { PlayerCard } from '@components/PlayerCard'
import { useNavigation, useRoute } from '@react-navigation/native'
import { groupDelete } from '@storage/group/groupDelete'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { AppError } from '@utils/AppError'
import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

type RouteParams = {
  group: string
}

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [playerName, setPlayerName] = useState('')

  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as RouteParams

  async function handleAddPlayer() {
    if (playerName.trim().length === 0) {
      return Alert.alert(
        'Nova pessoa',
        'Informe o nome da pessoa para adicionar',
      )
    }

    const newPlayer = {
      name: playerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)
      await fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nova pessoa', 'Não foi possível adicionar')
      }
    } finally {
      setPlayerName('')
    }
  }

  const fetchPlayersByTeam = useCallback(async () => {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      Alert.alert(
        'Pessoas',
        'Não foi possivel carregar as pessoas do time selecionado',
      )
    }
  }, [group, team])

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa')
    }
  }

  async function deleteGroup() {
    try {
      await groupDelete(group)
      navigation.navigate('groups')
    } catch (error) {
      console.error(error)
      Alert.alert('Remover grupo', 'Não foi possível deletar esse grupo')
    }
  }

  async function handleGroupDelete() {
    Alert.alert('Remover', 'Deseja deletar o grupo ?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => deleteGroup(),
      },
    ])
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [fetchPlayersByTeam])

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          onChangeText={setPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={playerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupDelete}
      />
    </Container>
  )
}
