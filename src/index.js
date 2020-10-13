import React from 'react';
import {
    Switch,
    Route,
    Redirect,
    BrowserRouter
} from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AssetBrowserPage from "./browser/page/AssetBrowserPage";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Switch>
              <Route path={'/'} >
                  {props => <AssetBrowserPage fullscreen {...props}/>}
              </Route>
          </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
