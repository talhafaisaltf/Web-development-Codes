
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontendLayout from './Pages/layouts/FrontendLayout';

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: 0,
        staleTime: 5 * 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
      <Routes>
        <Route element={<FrontendLayout />}>
          <Route  />
        </Route>
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
