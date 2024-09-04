import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/Home';
import './theme/_globals.scss';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}
