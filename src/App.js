import React from 'react';
import UsersTable from './task2/UsersTable';
import NewPost from './task2/NewPost';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <div className="App">
      <h1>User Posts App</h1>
      <Provider store={store}>
        <BrowserRouter >
          <Routes>
            <Route exact path="/" element={<UsersTable />}></Route>
            <Route exact path='/new-post/:userId' element={<NewPost />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
