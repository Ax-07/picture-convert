import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import {InfoPicture} from './InfoPicture';

describe('InfoPicture', () => {
  const pictureProperty = {
    size: 1000,
    width: 500,
    height: 500,
  };
  test('renders InfoPicture component', () => {
    render(<InfoPicture pictureProperty={pictureProperty} type="origine" />);
    const title = screen.getByText('Image originale');
    expect(title).toBeInTheDocument();
    const dimensions = screen.getByText('Dimensions : 500 x 500');
    expect(dimensions).toBeInTheDocument();
    const size = screen.getByText('Taille : 1 Ko');
    expect(size).toBeInTheDocument();
  });
});