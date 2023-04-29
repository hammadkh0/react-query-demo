import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import HomePage from "./Components/HomePage";
import RQSuperHeroesPage from "./Components/RQSuperheroes";
import Superheroes from "./Components/Superheroes";
import "./App.css";
import RQSuperHero from "./Components/RQSuperHero";
import ParallelQueries from "./Components/ParallelQueries";
import DynamicParallel from "./Components/DynamicParallel";
import DependentQueries from "./Components/DependentQueries";
import PaginatedQueries from "./Components/PaginatedQueries";
import InfiniteQueries from "./Components/InfiniteQueries";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/super-heroes" element={<Superheroes />}></Route>
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />}></Route>
            <Route path="/rq-super-heroes/:heroId" element={<RQSuperHero />} />
            <Route path="/rq-parallel" element={<ParallelQueries />} />
            <Route path="/rq-paginated" element={<PaginatedQueries />} />
            <Route path="/rq-infinite" element={<InfiniteQueries />} />
            <Route path="/rq-dynamic-parallel" element={<DynamicParallel heroIds={[1, 2]} />} />
            <Route path="/rq-dependent" element={<DependentQueries email="deez@nuts.com" />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
