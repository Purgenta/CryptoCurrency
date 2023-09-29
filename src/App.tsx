import { Provider } from "react-redux";
import Router from "./router/Router";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router></Router>
    </Provider>
  );
};

export default App;
