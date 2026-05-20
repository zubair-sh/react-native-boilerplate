import { useTranslation } from 'react-i18next';

import { useAuth } from '@features/auth';
import { AppButton, AppContainer, AppText } from '@shared/components';

export default function ProfileScreen() {
  const { t } = useTranslation('profile');
  const { user, logout } = useAuth();

  return (
    <AppContainer padded>
      <AppText variant="h2" style={{ marginBottom: 24 }}>
        {t('title')}
      </AppText>

      <AppText variant="h4">
        {user?.firstName} {user?.lastName}
      </AppText>
      <AppText variant="bodySmall" color="textSecondary" style={{ marginTop: 4 }}>
        {user?.email}
      </AppText>

      <AppButton
        title={t('logout.button')}
        variant="danger"
        onPress={logout}
        style={{ marginTop: 48 }}
      />
    </AppContainer>
  );
}
