import { Avatar, Text, Paper, Center } from '@mantine/core'
import { auth } from '../firebase/firebase'

interface UserInfoProps {
  avatar: string
  name: string
}

export function UserInfo({ avatar, name }: UserInfoProps) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Center>
        {auth.currentUser ? (
          <Avatar
            radius="xl"
            variant="outline"
            src={auth.currentUser.photoURL}
            size="lg"
          />
        ) : (
          <Avatar radius="xl" variant="outline" color="blue" size="lg" />
        )}
      </Center>
      <Text align="center" size="lg" weight={500} mt="md">
        {auth.currentUser ? auth.currentUser.displayName : name}
      </Text>
    </Paper>
  )
}
