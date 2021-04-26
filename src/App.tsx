import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import GlobalSnackbar from './components/GlobalSnackbar';
import GlobalBackdrop from './components/GlobalBackdrop';
import GlobalAppBar from './components/GlobalAppBar';
import NotFoundPage from './pages/NotFoundPage';
import QueryPage from './pages/QueryPage';
import DetailPage from './pages/DetailPage';

const App: FC = () => (
  <Router>
    <CssBaseline />
    <GlobalBackdrop />
    <GlobalSnackbar />
    <GlobalAppBar />
    <Switch>
      <Route path="/" exact>
        <QueryPage />
      </Route>
      <Route path="/create" exact>
        <DetailPage />
      </Route>
      <Route path="/update/:id" exact>
        <DetailPage />
      </Route>
      <Route path="/*">
        <NotFoundPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
