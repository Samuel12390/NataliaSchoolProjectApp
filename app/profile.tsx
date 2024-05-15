import { Stack, useLocalSearchParams } from 'expo-router';
import { ArticleCarousel } from '~/components/ArticleCarousel';
import { Container } from '~/components/Container';
import { LandingPage } from '~/components/LandingPage';
import { Profile } from '~/components/Profile';

export default function Details() {
  const { name } = useLocalSearchParams();



  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <Container>
        <Profile />
      </Container>
    </>
  );
}
