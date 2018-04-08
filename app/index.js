import './common/fonts/stylesheet.css';
import "./common/styles/_base.scss";
import AppModel from "./src/models/model.app.js";
import AppView from "./src/views/view.app.js";
import AppController from "./src/controllers/controller.app.js";
import RouteController from "./src/controllers/controller.route.js";
import Data from "./common/data/data.json";

class App {
  constructor() {
    this.model = AppModel;
    this.view = AppView;
    this.controller = AppController;
    this.route = RouteController;
  }
}

window.App = new App();
window.App.route.init();

export default window.App;
