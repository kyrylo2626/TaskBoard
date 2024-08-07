import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as taskWindowReducer } from './options/taskWindow.slice'
import { reducer as dataModeReducer } from './options/dataMode.slice'
import { reducer as historyWindowReducer } from './options/historyWindow.slice'
import { reducer as editNameModeReducer } from './options/editNameMode.slice'


const reducers = combineReducers({
  taskWindow: taskWindowReducer,
  dataMode: dataModeReducer,
  historyWindow: historyWindowReducer,
  editNameMode: editNameModeReducer
})

export const store = configureStore({
  reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch