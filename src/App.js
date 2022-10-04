import "reset-css";
import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import { themes } from "./components/tools/themes";

const GlobalStyle = createGlobalStyle`
body {
  font-family: Arial, Helvetica, sans-serif;
  background:${({ theme }) => themes[theme].body};
  color:${({ theme }) => themes[theme].color};
  transition:.2s ;
}
* {
  -webkit-tap-highlight-color:transparent ;
}
`;
export const App = () => {
  const [theme] = useState('light');
  return (
    <>
      <GlobalStyle theme={theme} />
    </>
  );
};


