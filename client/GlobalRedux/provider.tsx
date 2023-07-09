import { Provider } from "react-redux";
import { store } from "./store";
import Navbar from "../components/Navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <>
        <Navbar />
        {children}
      </>
    </Provider>
  );
}
