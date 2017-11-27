import './common/fonts/Questrial/stylesheet.css'
import './common/fonts/Roboto/stylesheet.css'
import './common/styles/_base.scss'
import $ from 'jquery'
import Config from "./config"
import Router from './route'

import headerView from '../app/views/header/view';

function App() {
    headerView();
    Router();
}

App();