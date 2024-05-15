import { Stack, Link } from 'expo-router';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Respira Segundo' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Login" />
        <Link href={{ pathname: '/details', params: { name: 'Natalia' } }} asChild>
          <Button title="Don't have an account? Create one here!" />
        </Link>
      </Container>
    </>
  );
}
