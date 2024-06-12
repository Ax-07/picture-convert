export const setConvertFormData = (images) => {
    const formData = new FormData();
    formData.append("images", images);

    return formData;
  }
export const setCompressFormData = (images, quality) => {
    const formData = new FormData();
    formData.append("images", images);
    formData.append("quality", quality);

    return formData;
  }
export const setMultiSizeFormData = (images, quality, sizes) => {
    const formData = new FormData();
    formData.append("images", images);
    formData.append("quality", quality);
    formData.append("sizes", JSON.stringify(sizes));

    return formData;
  }