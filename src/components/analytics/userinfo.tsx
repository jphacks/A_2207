import { Avatar, Text, Paper } from '@mantine/core';

interface UserInfoProps {
  avatar: string;
  name: string;
}

export function UserInfo({ avatar, name }: UserInfoProps) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={avatar} size={120} radius={120} mx="auto" />
      <Text align="center" size="lg" weight={500} mt="md">
        {name}
      </Text>
    </Paper>
  );
}