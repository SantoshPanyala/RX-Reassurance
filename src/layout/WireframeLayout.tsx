import { ReactNode } from 'react';
import './WireframeLayout.css';

interface WireframeLayoutProps {
  children: ReactNode;
}

export function WireframeLayout({ children }: WireframeLayoutProps) {
  return (
    <div className="wireframe-layout">
      {children}
    </div>
  );
}