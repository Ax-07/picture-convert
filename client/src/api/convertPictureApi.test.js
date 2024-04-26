import { describe, test, vi, expect, beforeEach } from "vitest";
import { convertPicture, compressPicture, multiSizePicture } from './convertPictureApi';

const fetchReponseTrue = {
  ok: true,
  json: () => Promise.resolve({ success: true }),
};
const fetchReponseFalse = {
  ok: false,
  json: () => Promise.resolve({ success: false }),
};

// chaque fois que fetch est appelé dans le code testé, 
// il exécutera cette version simulée et renverra la valeur définie 
// fetchReponseTrue ou fetchReponseFalse selon le cas.
globalThis.fetch = vi.fn(() => Promise.resolve(fetchReponseTrue));

describe('test', async () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('convertPicture sends a POST request and handles response', async () => {
    const formData = new FormData();
    const response = await convertPicture(formData);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8050/api/convert', {
      method: 'POST',
      body: formData,
    });
    expect(response).toEqual({ success: true });
  });

  test('compressPicture sends a POST request and handles response', async () => {
    const formData = new FormData();
    const response = await compressPicture(formData);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8050/api/compress', {
      method: 'POST',
      body: formData,
    });
    expect(response).toEqual({ success: true });
  });

  test('multiSizePicture sends a POST request and handles response', async () => {
    const formData = new FormData();
    const response = await multiSizePicture(formData);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8050/api/multi-size', {
      method: 'POST',
      body: formData,
    });
    expect(response).toEqual({ success: true });
  });
});

describe('error test', async () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('convertPicture handles error', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve(fetchReponseFalse));
    const formData = new FormData();

    try {
      await convertPicture(formData);
    } catch (error) {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:8050/api/convert', {
        method: 'POST',
        body: formData,
      });
      expect(error).toEqual(new Error('Erreur lors de la conversion de l\'image'));
    }
  });

  test('compressPicture handles error', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve(fetchReponseFalse));
    const formData = new FormData();

    try {
      await compressPicture(formData);
    } catch (error) {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:8050/api/compress', {
        method: 'POST',
        body: formData,
      });
      expect(error).toEqual(new Error('Erreur lors de la compression de l\'image'));
    }
  });

  test('multiSizePicture handles error', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve(fetchReponseFalse));
    const formData = new FormData();

    try {
      await multiSizePicture(formData);
    } catch (error) {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:8050/api/multi-size', {
        method: 'POST',
        body: formData,
      });
      expect(error).toEqual(new Error('Erreur lors de la création des images'));
    }
  });
});
