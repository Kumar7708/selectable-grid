import React from 'react';
import './style.css';
import Matrix from './components/Matrix';

export default function App() {
  return (
    <div>
      <Matrix rows={10} cols={10} />
    </div>
  );
}
