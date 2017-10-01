import './common/fonts/Questrial/stylesheet.css'
import './common/styles/_base.scss'
import $ from 'jquery'
import Config from "./config"
import Router from './route'

import headerView from '../app/views/header/view'
import sidebarView from '../app/views/sidebar/view'
import footerView from '../app/views/footer/view'

function App() {
    headerView();
   // sidebarView();
  //  footerView();
    Router();
}

App();