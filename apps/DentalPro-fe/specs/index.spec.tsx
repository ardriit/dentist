import React from 'react';
import { render } from '@testing-library/react';
import Page from '../src/app/[lang]/page';
import { MantineProvider } from '@mantine/core';

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MantineProvider>
        <Page />
      </MantineProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
