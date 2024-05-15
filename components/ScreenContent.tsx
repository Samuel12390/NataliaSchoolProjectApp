import { YStack, H1, Separator, Image, Theme } from 'tamagui';
import { EditScreenInfo } from './EditScreenInfo';
import { SignInPage } from '~/components/SignInPage';
import { Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';


type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularIcon: {
    borderRadius: 200, // Half of the width and height to make it circular
    overflow: 'hidden', // Clip the content to the rounded borders
    borderWidth: 2, // Optional: Add border width
    borderColor: 'black', // Optional: Add border color
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Resize mode to cover the entire circle
  },
});


export const ScreenContent = ({ title }: ScreenContentProps) => {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center"> 
        <Image
          source={require('~/assets/logo.png')}
          style={styles.image}
        />
        <H1 fontWeight={600}>{title}</H1>
      </YStack>
      <SignInPage />
    </Theme>
    
  );
};
