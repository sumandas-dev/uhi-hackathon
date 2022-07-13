import React, {ReactElement} from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {useThemeContext} from '../AppContextProvider/ThemeContextProvider';
import {LayoutDirection} from '../../../shared/constants/AppEnums';

interface AppStyleProviderProps {
  children: ReactElement;
}

const AppStyleProvider: React.FC<AppStyleProviderProps> = (props) => {
  const { theme } = useThemeContext();
  if (theme.direction === LayoutDirection.LTR) return props.children;
  return <CacheProvider value={createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  })}>{props.children}</CacheProvider>;
};
export default AppStyleProvider;
