
import React,
{
  useCallback
}
from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProblemQuadrant from './components/ProblemQuadrant';
import useLocalStorage from './hooks/useLocalStorage';
import {
  ProblemsState,
  QuadrantId
} from './types';
import {
  QUADRANT_CONFIG
} from './constants';

const initialProblemsState: ProblemsState = {
  [QuadrantId.GladToHave]: [],
  [QuadrantId.WishIDidnt]: [],
  [QuadrantId.Tiny]: [],
  [QuadrantId.CantControl]: [],
};

const App: React.FC = () => {
  const [problems, setProblems] = useLocalStorage<ProblemsState>('problem-matrix-data', initialProblemsState);

  const handleAddProblem = useCallback((quadrantId: QuadrantId) => (text: string) => {
    const newProblem = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    setProblems(prev => ({
      ...prev,
      [quadrantId]: [newProblem, ...prev[quadrantId]],
    }));
  }, [setProblems]);

  const handleToggleProblem = useCallback((quadrantId: QuadrantId) => (id: string) => {
    setProblems(prev => {
      const updatedQuadrant = prev[quadrantId].map(p =>
        p.id === id ? { ...p,
          completed: !p.completed
        } : p
      );
      // Sort to move completed items to the bottom
      updatedQuadrant.sort((a, b) => Number(a.completed) - Number(b.completed));
      return {
        ...prev,
        [quadrantId]: updatedQuadrant,
      };
    });
  }, [setProblems]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {(Object.keys(QUADRANT_CONFIG) as QuadrantId[]).map((key) => (
            <ProblemQuadrant
              key={key}
              title={QUADRANT_CONFIG[key].title}
              color={QUADRANT_CONFIG[key].color}
              problems={problems[key] || []}
              onAddProblem={handleAddProblem(key)}
              onToggleProblem={handleToggleProblem(key)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
