import React from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
interface Props {
  children: React.ReactNode;
}

/** A Fake MapProvider for use in Storybook */
const MapProvider: React.FC<React.PropsWithChildren<object>> = ({
  children
}) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      {children}
    </APIProvider>
  );
};

export const WithMap: React.FC<Props> = ({ children }) => {
  return <MapProvider>{children}</MapProvider>;
};

export default WithMap;
