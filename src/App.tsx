import { Provider } from "react-redux";
import Router from "./router/Router";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router></Router>
    </Provider>
  );
};

export default App;
