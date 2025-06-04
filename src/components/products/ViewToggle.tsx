import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
}

/**
 * Toggle component for switching between grid and list views
 * Hidden on mobile devices where only list view is available
 */
const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewChange }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <div className="flex justify-end mb-6">
      <div className="bg-white rounded-lg p-1 inline-flex shadow-sm">
        <Button 
          variant={viewMode === 'grid' ? "secondary" : "ghost"} 
          size="icon" 
          onClick={() => onViewChange('grid')}
          className="rounded-md"
          aria-label="Grid view"
        >
          <LayoutGrid size={18} />
        </Button>
        <Button 
          variant={viewMode === 'list' ? "secondary" : "ghost"} 
          size="icon" 
          onClick={() => onViewChange('list')}
          className="rounded-md"
          aria-label="List view"
        >
          <List size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ViewToggle;