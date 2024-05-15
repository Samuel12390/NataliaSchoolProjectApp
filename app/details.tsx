import { Stack, useLocalSearchParams } from 'expo-router';
import { Container } from '~/components/Container';
import { CreateAccountPage } from '~/components/CreateAccount';
import { ScreenContent } from '~/components/ScreenContent';

export default function Details() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: 'Details' }} />
      <Container>
        <CreateAccountPage />
      </Container>
    </>
  );
}
