import { OverviewShowcase } from '@/components/overview-showcase';
import { Screen } from '@/components/screen';
import { Product } from '@/constants/product';
import { IS_IOS } from '@/theme/platform';

export default function HomeScreen() {
  return (
    <Screen
      title={Product.tabs.overview}
      subtitle={`${Product.name} demonstrates production-style finance screens while staying lightweight as an example app.`}
      showTitle={!IS_IOS}
      useNativeHeader={IS_IOS}
    >
      <OverviewShowcase />
    </Screen>
  );
}
