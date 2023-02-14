import { Container, Content, Icon } from './styles'

import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { groupCraete } from '@storage/group/groupCreate'

export function NewGroup() {
  const navigation = useNavigation()
  const [groupName, setGroupName] = useState('')

  async function handleNew() {
    try {
      await groupCraete(groupName)
      navigation.navigate('players', { group: groupName })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroupName} />
        <Button onPress={handleNew} title="Criar" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  )
}
