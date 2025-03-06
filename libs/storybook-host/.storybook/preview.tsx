import {
  Meta,
  Story,
  Canvas,
  Description,
  ArgTypes,
  IconGallery,
  IconItem,
  ColorPalette,
  ColorItem,
  Subtitle,
  Primary,
  Source,
  Controls,
  Stories
} from '@storybook/blocks';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { Archivo, Archivo_Black, Archivo_Narrow } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import Badge from './doc-blocks/badge';
import Tip from './doc-blocks/tip';
import WorksWith from './doc-blocks/works-with';
import Title from './doc-blocks/title';
import Version from './doc-blocks/version';

import { Preview } from '@storybook/react';

import '@theme/index.scss';

initialize({ onUnhandledRequest: 'bypass' });

const ArchivoFont = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const ArchivoBlackFont = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const ArchivoNarrowFont = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
});

const viewports = {
  iPhoneXR: {
    name: 'iPhone XR',
    styles: {
      width: '414px',
      height: '896px'
    }
  },
  iPhoneXS: {
    name: 'iPhone XS',
    styles: {
      width: '375px',
      height: '812px'
    }
  },
  iPhone5: {
    name: 'iPhone 5',
    styles: {
      width: '320px',
      height: '568px'
    }
  },
  iPadPro: {
    name: 'iPad Pro',
    styles: {
      width: '1024px',
      height: '1366px'
    }
  },
  iPad: {
    name: 'iPad (Other)',
    styles: {
      width: '768px',
      height: '1024px'
    }
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '1024px'
    }
  },
  ultrawide: {
    name: 'Ultrawide Desktop',
    styles: {
      width: '1600px',
      height: '1200px'
    }
  }
};

export const parameters: any = {
  docs: {
    page: () => (
      <>
        <Title />
        <WorksWith />
        <Subtitle />
        <Description />
        <Primary />
        <Controls />
        <Stories />
      </>
    ),
    components: {
      Version,
      Meta,
      Story,
      Canvas,
      Primary,
      Source,
      Controls,
      Description,
      ArgTypes,
      IconGallery,
      IconItem,
      Badge,
      Title,
      Tip,
      WorksWith,
      ColorPalette,
      ColorItem
    }
  },
  options: {
    showSearchBox: true,
    storySort: {
      method: 'configure',
      includeName: true,
    }
  },
  layout: 'centered',
  viewport: {
    viewports
  },
  controls: {
    expanded: true
  }
};

const preview: Preview = {
  parameters,
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <ClerkProvider appearance={{
        variables: {
          fontSize: "1.6rem",
        },
      }}>
      <div className={`${ArchivoFont.variable} ${ArchivoBlackFont.variable} ${ArchivoNarrowFont.variable}`}>
        <Story />
      </div>
      </ClerkProvider>
    )
  ]
};

export default preview;
