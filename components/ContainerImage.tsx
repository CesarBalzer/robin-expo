import {
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  ScrollViewProps,
  StatusBar,
  StyleProp,
  View,
  ViewProps,
  ViewStyle
} from "react-native";
import { useEffect, useMemo } from "react";
import * as imgs from "@app/assets";
import * as NavigationBar from "expo-navigation-bar";

export type ImageName = 'light' | 'car' | 'blue';

interface ContainerProps extends ViewProps {
  background?: ImageName;
  scrollable?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  ignoreSafeArea?: boolean;
}

export const ContainerImage: React.FC<ContainerProps> = ({
  background = 'light',
  ...props
}) => {
  const paddingBottom = useMemo(getNavigationBarHeight, []);
  const imgMap: Record<ImageName, any> = {
    blue: imgs.background_blue,
    car: imgs.background_car,
    light: imgs.background_light
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#FFFFFF01');
      NavigationBar.setPositionAsync('absolute');
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, []);

  function getNavigationBarHeight() {
    if (Platform.OS === 'android') {
      const screen = Dimensions.get('screen').height;
      const window = Dimensions.get('window').height;
      const statusBar = StatusBar.currentHeight || 0;
      return (screen - window - statusBar) + 0;
    }
    return 20;
  }

  const SafeContainer = props.ignoreSafeArea ? View : SafeAreaView;

  const Container: typeof View | typeof ScrollView = props.scrollable ? ScrollView : View;

  const style: any = props.scrollable ?
    {
      style: {
        flex: 1,
        paddingBottom
      },
      contentContainerStyle: [{
        flex: 1,
        padding: 20,
      }, props.contentContainerStyle],
    }
    :
    {
      style: [{
        flex: 1,
        padding: 20,
        paddingBottom,
      }, props.style],
    }

  return (
    <ImageBackground source={imgMap[background]} style={{ flex: 1 }} resizeMode="stretch">
      <StatusBar translucent />
      <SafeContainer style={{ flex: 1 }}>
        <Container
          {...props}
          {...style}
        />
      </SafeContainer>
    </ImageBackground>
  )
}