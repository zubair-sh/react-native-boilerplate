import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';

import { AppButton, AppContainer, AppField, AppLink, AppText } from '@shared/components';
import { useTheme } from '@theme/index';

import { AUTH_ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { loginSchema, type LoginFormValues } from '../types/auth.schemas';

export default function LoginScreen() {
  const { t } = useTranslation('auth');
  const { spacing } = useTheme();
  const { login, isLoggingIn } = useAuth();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
    } catch {
      Alert.alert(t('errors.invalidCredentials'));
    }
  };

  return (
    <AppContainer centered padded keyboardAvoiding>
      <AppText variant="h1" mb="sm">
        {t('login.title')}
      </AppText>
      <AppText variant="bodyLarge" color="textSecondary" mb="xxl">
        {t('login.subtitle')}
      </AppText>

      <AppField
        control={control}
        name="email"
        type="email"
        label={t('login.emailLabel')}
        placeholder={t('login.emailPlaceholder')}
      />

      <AppField
        control={control}
        name="password"
        type="password"
        label={t('login.passwordLabel')}
        placeholder={t('login.passwordPlaceholder')}
      />

      <AppButton
        title={t('login.submitButton')}
        onPress={handleSubmit(onSubmit)}
        loading={isLoggingIn}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: spacing.lg,
          alignItems: 'center',
        }}
      >
        <AppText variant="body" color="textSecondary">
          {t('login.noAccount')}{' '}
        </AppText>
        <AppLink href={AUTH_ROUTES.REGISTER}>{t('login.signUpLink')}</AppLink>
      </View>
    </AppContainer>
  );
}
