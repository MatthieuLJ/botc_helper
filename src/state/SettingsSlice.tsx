import { createSlice } from '@reduxjs/toolkit';


type SettingsState = {
  // 0 = No tutorial shown yet
  // 1 = Setup completed
  // 2 = Playview completed
  // 3 = Playerview completed
  tutorialStage: number,
};

const initialState: SettingsState = {
  tutorialStage: 0,
};


export const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTutorialStage: (state, action) => {
      state.tutorialStage = action.payload.stage;
    },
    resetSettings: (state) => {
      state = initialState;
    }
  }
});

export const { setTutorialStage, resetSettings } = SettingsSlice.actions;

export default SettingsSlice.reducer;