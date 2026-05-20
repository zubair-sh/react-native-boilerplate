import { Link, type Href } from 'expo-router';
import { StyleSheet, Text, type TextStyle } from 'react-native';

import { useTheme } from '@theme/index';

interface AppLinkProps {
  href: Href;
  children: string;
  style?: TextStyle;
}

export function AppLink({ href, children, style }: AppLinkProps) {
  const { colors } = useTheme();

  return (
    <Link href={href} asChild>
      <Text
        style={StyleSheet.flatten([
          {
            color: colors.primary,
            fontSize: 14,
            fontWeight: '500' as const,
          },
          style,
        ])}
      >
        {children}
      </Text>
    </Link>
  );
}
