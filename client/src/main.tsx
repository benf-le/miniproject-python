import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ToastProvider} from "./providers/toaster-providers.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      {/*<Provider store={store}>*/}
          <App />
      <ToastProvider/>
      {/*</Provider>*/}
  </React.StrictMode>,


    // // <React.StrictMode>
    //   <QueryClientProvider client={queryClient}>
    //     <Provider store={store}>
    //         <App />
    //     </Provider>
    //       <ReactQueryDevtools initialIsOpen={false} />
    //   </QueryClientProvider>
    // // </React.StrictMode>,
)
