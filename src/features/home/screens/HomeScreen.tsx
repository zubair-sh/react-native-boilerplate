import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';

import { useAuth, useMeQuery } from '@features/auth';
import { AppButton, AppContainer, AppText } from '@shared/components';

export default function HomeScreen() {
  const { t } = useTranslation('home');
  const { logout } = useAuth();

  // Fetch fresh profile on mount — also syncs Redux state via onQueryStarted
  const { data: user, isLoading, isError } = useMeQuery();

  return (
    <AppContainer padded>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <>
          <AppText variant="h2" mt="lg">
            {t('greeting', { name: user?.email ?? 'there' })}
          </AppText>

          {isError ? (
            <AppText variant="body" color="error" mt="sm">
              {t('profileLoadError', { defaultValue: 'Could not load profile.' })}
            </AppText>
          ) : null}

          <AppButton
            title={t('logout', { defaultValue: 'Log out' })}
            variant="danger"
            onPress={logout}
            fullWidth={false}
            style={{ marginTop: 32, alignSelf: 'flex-start', paddingHorizontal: 24 }}
          />
        </>
      )}
    </AppContainer>
  );
}
