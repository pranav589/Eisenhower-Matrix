const MOVE_WITHIN_COLUMN = "move_within_column";
const MOVE_ACROSS_COLUMN = "move_across_column";
const ADD_TASK = "add_task";

const persistedData = (function readPersistedData() {
  if (!localStorage.getItem("matrixData")) {
    localStorage.setItem("matrix-key", 0);
    const initialState = {
      tasks: {},

      columns: {
        doFirst: {
          id: "doFirst",
          title: "Do First",
          taskIds: [],
        },

        schedule: {
          id: "schedule",
          title: "Schedule",
          taskIds: [],
        },

        delegate: {
          id: "delegate",
          title: "Delegate",
          taskIds: [],
        },

        eliminate: {
          id: "eliminate",
          title: "Eliminate",
          taskIds: [],
        },
      },
    };
    return initialState;
  }

  let data = localStorage.getItem("matrixData");
  data = JSON.parse(data);

  return data;
})();

export const moveWithinColumn = (columnId, task) => {
  return { type: MOVE_WITHIN_COLUMN, columnId: columnId, task };
};

export const moveAcrossColumn = (
  sourceColumnId,
  sourceColumTask,
  destinationColumnId,
  destinationColumnTask
) => {
  return {
    type: MOVE_ACROSS_COLUMN,
    sourceColumnId,
    sourceColumTask,
    destinationColumnId,
    destinationColumnTask,
  };
};

export const addTask = (id, content, columnId) => {
  return { type: ADD_TASK, id, content, columnId };
};

const taskReducer = (state = persistedData, action) => {
  if (!state) return;
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case MOVE_WITHIN_COLUMN:
      newState.columns[action.columnId].taskIds = action.task;
      break;
    case MOVE_ACROSS_COLUMN:
      newState.columns[action.sourceColumnId].taskIds = action.sourceColumTask;
      newState.columns[action.destinationColumnId].taskIds =
        action.destinationColumnTask;
      break;
    case ADD_TASK:
      newState.tasks[action.id] = { id: action.id, content: action.content };
      newState.columns[action.columnId].taskIds.push(action.id);
      break;
    default:
      return newState;
  }
  return newState;
};

export default taskReducer;
