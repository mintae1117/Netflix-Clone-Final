import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from './theme';
import reset from 'styled-reset'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'


const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    color:white;
    line-height: 1.2;
    background-color: black;
    -ms-overflow-style: none;
    ::-webkit-scrollbar{
      display: none;
    }// ms scrollbar hidden.
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;// styled-reset

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
