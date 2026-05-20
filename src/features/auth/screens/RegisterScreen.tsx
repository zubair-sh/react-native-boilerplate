import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';

import { AppButton, AppContainer, AppField, AppLink, AppText } from '@shared/components';
import { useTheme } from '@theme/index';

import { AUTH_ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { registerSchema, type RegisterFormValues } from '../types/auth.schemas';

export default function RegisterScreen() {
  const { t } = useTranslation('auth');
  const { spacing } = useTheme();
  const { register, isRegistering } = useAuth();

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async ({ confirmPassword: _cp, ...data }: RegisterFormValues) => {
    try {
      await register(data);
    } catch {
      Alert.alert(t('errors.emailAlreadyInUse'));
    }
  };

  return (
    <AppContainer padded keyboardAvoiding scroll>
      <AppText variant="h1" mt="md" mb="sm">
        {t('register.title')}
      </AppText>
      <AppText variant="bodyLarge" color="textSecondary" mb="xxl">
        {t('register.subtitle')}
      </AppText>

      <AppField
        control={control}
        name="firstName"
        type="name"
        label={t('register.firstNameLabel')}
      />

      <AppField control={control} name="lastName" type="name" label={t('register.lastNameLabel')} />

      <AppField
        control={control}
        name="email"
        type="email"
        label={t('register.emailLabel')}
        placeholder={t('register.emailPlaceholder')}
      />

      <AppField
        control={control}
        name="password"
        type="newPassword"
        label={t('register.passwordLabel')}
      />

      <AppField
        control={control}
        name="confirmPassword"
        type="confirmPassword"
        label={t('register.confirmPasswordLabel')}
      />

      <AppButton
        title={t('register.submitButton')}
        onPress={handleSubmit(onSubmit)}
        loading={isRegistering}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: spacing.lg,
          marginBottom: spacing.md,
          alignItems: 'center',
        }}
      >
        <AppText variant="body" color="textSecondary">
          {t('register.hasAccount')}{' '}
        </AppText>
        <AppLink href={AUTH_ROUTES.LOGIN}>{t('register.signInLink')}</AppLink>
      </View>
    </AppContainer>
  );
}
