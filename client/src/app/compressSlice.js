import { createSlice } from '@reduxjs/toolkit';

const compressSlice = createSlice({
    name: 'compress',
    initialState: {
        originalPicture: '',
        compressedPicture: '',
    },
    reducers: {
        setOriginalPicture: (state, action) => {
            state.originalPicture = action.payload;
        },
        setCompressedPicture: (state, action) => {
            state.compressedPicture = action.payload;
        },
        resetCompress: (state) => {
            state.originalPicture = '';
            state.compressedPicture = '';
        },
        
    },
});

export const { setOriginalPicture, setCompressedPicture, resetCompress } = compressSlice.actions;
export default compressSlice.reducer;