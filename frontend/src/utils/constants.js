const RESULT_EMPTY = {
  steps: [],
  commands: [],
  risks: [],
  rationale: "",
};

const OWNER_NAME = "Darnell Valerio";
const APP_NAME = "HelpDesk AI";
const APP_VERSION = import.meta.env.VITE_APP_VERSION || "dev";

export { RESULT_EMPTY, OWNER_NAME, APP_NAME, APP_VERSION };
