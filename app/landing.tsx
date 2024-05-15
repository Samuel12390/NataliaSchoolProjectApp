import { Stack, useLocalSearchParams } from 'expo-router';
import { Container } from '~/components/Container';
import { LandingPage } from '~/components/LandingPage';

export default function Details() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: 'Details' }} />
      <Container>
        <LandingPage />
      </Container>
    </>
  );
}
