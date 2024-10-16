import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ConfigProvider, Switch } from 'antd';
import { RouterProvider } from "react-router-dom";
import { TeamsContextProvider } from "./utils/teamsContext"
import router from "./App";
import "./index.css";
import { EmployeesContextProvider } from "./utils/employeesContext";
import { ModalContextProvider } from "./hooks/useModal/useModalProvider";

const themeConfig = {
  token: {
      colorPrimaryHover: "#86878",
      colorText: "#42434B",
      fontFamily: "Manrope",
      fontSize: 16,
      lineHeight: 1.5,
  },
  components: {
      Tabs: {
          inkBarColor: "#E10D34",
          itemHoverColor: "#42434B",
          itemSelectedColor: "#42434B",
          itemColor: "#86878C",
          cardHeight: "42px"
      },
      Switch: {
        colorPrimary: "#E10D34"
      }
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TeamsContextProvider>
      <EmployeesContextProvider>
        <ConfigProvider theme={themeConfig}>
          <ModalContextProvider>
            <RouterProvider router={router} />
          </ModalContextProvider>
        </ConfigProvider>
      </EmployeesContextProvider>
    </TeamsContextProvider>
  </React.StrictMode>
);
