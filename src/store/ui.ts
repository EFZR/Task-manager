export type UiActions =
  | { type: "switch-toggle" }
  | { type: "switch-theme" }
  | { type: "switch-project-modal" };

export type UiState = {
  toggle: Boolean,
  theme: Boolean,
  projectModal: Boolean,
};

export const initialState: UiState = {
  toggle: false,
  theme: false,
  projectModal: false
};

export const UiReducer = (
  state: UiState = initialState,
  action: UiActions
) => {
  if (action.type === "switch-theme") {
    return {
      ...state,
      theme: !state.theme
    }
  }

  if (action.type === "switch-toggle") {
    return {
      ...state,
      toggle: !state.toggle
    }
  }

  if (action.type === "switch-project-modal") {
    return {
      ...state,
      projectModal: !state.projectModal
    }
  }

  return state;
};