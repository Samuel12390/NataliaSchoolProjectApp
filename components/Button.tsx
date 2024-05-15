import { forwardRef } from 'react';

import { Button as TButton, ButtonText } from '../tamagui.config';
import { TouchableOpacity, ButtonProps } from 'react-native';

export const Button = forwardRef<TouchableOpacity, ButtonProps>(({ onPress, title }, ref) => {
  return (
    <TButton onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </TButton>
  );
});
