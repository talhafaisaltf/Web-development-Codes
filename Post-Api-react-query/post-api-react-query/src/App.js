import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Post from "./Pages/Post";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomLayout from "./Layout/Customlayout";
import About from "./Pages/About";
import CreatePost from "./Pages/CreatePost";
import EditPost from "./Pages/Edit";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<CustomLayout />}>
            <Route path="/" element={<Post />} />
            <Route path="/post/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:postId" element={<EditPost />} />
            <Route path="/contact" element={<h2>Contact Us</h2>} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
