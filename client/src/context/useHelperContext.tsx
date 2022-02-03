import { useState, useContext, createContext, FunctionComponent, SyntheticEvent, useCallback } from 'react';

interface IHelperContext {
  profilePhotoKey: string | null;
  updateProfilePhotoKey: (profilePhotoKey: string) => void;
}

export const HelperContext = createContext<IHelperContext>({
  profilePhotoKey: null,
  updateProfilePhotoKey: () => null,
});

export const HelperProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [profilePhotoKey, setProfilePhotoKey] = useState<string | null>(null);

  const updateProfilePhotoKey = useCallback((profilePhotoKey: string) => {
    console.log('helper context ' + profilePhotoKey);
    setProfilePhotoKey(profilePhotoKey);
  }, []);

  return <HelperContext.Provider value={{ profilePhotoKey, updateProfilePhotoKey }}>{children}</HelperContext.Provider>;
};

export function useHelper(): IHelperContext {
  return useContext(HelperContext);
}
