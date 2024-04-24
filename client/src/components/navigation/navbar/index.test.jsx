import { test, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { Navbar } from './Navbar';

test('renders correct links and responds to click event', async () => {
  render(
    <MemoryRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/convert" element={<div>Convert</div>} />
        <Route path="/compress" element={<div>Compress</div>} />
        <Route path="/multi-size" element={<div>Multi-size</div>} />
        <Route path="/guide" element={<div>Guide</div>} />
      </Routes>
    </MemoryRouter>
  );

  const links = screen.getAllByRole('link');
  expect(links[0]).toHaveTextContent('Picture convert');
  expect(links[1]).toHaveTextContent('Convert');
  expect(links[2]).toHaveTextContent('Compress');
  expect(links[3]).toHaveTextContent('Multi-size');
  expect(links[4]).toHaveTextContent('Guide');

  userEvent.click(links[0]);
  await waitFor(() => expect(screen.getByText('Home')).toBeInTheDocument());
  userEvent.click(links[1]);
  await waitFor(() => expect(screen.getByText('Convert')).toBeInTheDocument());
  userEvent.click(links[2]);
  await waitFor(() => expect(screen.getByText('Compress')).toBeInTheDocument());
  userEvent.click(links[3]);
  await waitFor(() => expect(screen.getByText('Multi-size')).toBeInTheDocument());
  userEvent.click(links[4]);
  await waitFor(() => expect(screen.getByText('Guide')).toBeInTheDocument());
});