import React, { useState } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragStartEvent, 
  DragEndEvent, 
  DragOverEvent,
  useDroppable
} from '@dnd-kit/core';
import { 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy, 
  useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const COLUMNS = ['Active', 'In Progress', 'Completed'];

function SortableInquiryCard({ inquiry }: { inquiry: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: inquiry.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-background border border-border p-4 rounded-xl shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-sm text-foreground">{inquiry.subject}</h4>
        <div className="text-[10px] text-muted-foreground">{new Date(inquiry.createdAt).toLocaleDateString()}</div>
      </div>
      <div className="text-xs text-muted-foreground line-clamp-3 mb-3">{inquiry.message}</div>
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-foreground">{inquiry.name}</div>
        <div className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{inquiry.category || 'General'}</div>
      </div>
    </div>
  );
}

function KanbanColumn({ column, items }: { column: string, items: any[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: column });

  return (
    <div className={`bg-surface border ${isOver ? 'border-primary' : 'border-border'} rounded-2xl p-4 flex flex-col h-[65vh] overflow-hidden transition-colors`}>
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">{column}</h3>
        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-bold">{items.length}</span>
      </div>
      <div ref={setNodeRef} className="flex-1 overflow-y-auto p-2 -mx-2">
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 min-h-[150px] h-full">
            {items.map(inquiry => (
              <SortableInquiryCard key={inquiry.id} inquiry={inquiry} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}

export function InquiriesKanban({ inquiries, onStatusChange }: { inquiries: any[], onStatusChange: (id: string, newStatus: string) => void }) {
  const [items, setItems] = useState(inquiries);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  React.useEffect(() => {
    setItems(inquiries);
  }, [inquiries]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    
    const activeId = active.id;
    const overId = over.id;
    
    if (activeId === overId) return;

    const isActiveColumn = COLUMNS.includes(activeId as string);
    const isOverColumn = COLUMNS.includes(overId as string);

    if (!isActiveColumn && !isOverColumn) {
      const activeItem = items.find(i => i.id === activeId);
      const overItem = items.find(i => i.id === overId);
      
      if (activeItem && overItem && (activeItem.status || 'Active') !== (overItem.status || 'Active')) {
        setItems((prev) => {
          const activeIndex = prev.findIndex(i => i.id === activeId);
          const newItems = [...prev];
          newItems[activeIndex] = { ...newItems[activeIndex], status: overItem.status || 'Active' };
          return newItems;
        });
      }
    } else if (!isActiveColumn && isOverColumn) {
      const activeItem = items.find(i => i.id === activeId);
      if (activeItem && (activeItem.status || 'Active') !== overId) {
        setItems((prev) => {
          const activeIndex = prev.findIndex(i => i.id === activeId);
          const newItems = [...prev];
          newItems[activeIndex] = { ...newItems[activeIndex], status: overId as string };
          return newItems;
        });
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (!over) return;
    
    const activeItem = items.find(i => i.id === active.id);
    const originalItem = inquiries.find(i => i.id === active.id);
    
    if (activeItem && originalItem && (activeItem.status || 'Active') !== (originalItem.status || 'Active')) {
      onStatusChange(activeItem.id, activeItem.status || 'Active');
    }
  };

  const activeItem = activeId ? items.find(i => i.id === activeId) : null;

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLUMNS.map(column => {
          const columnItems = items.filter(i => (i.status || 'Active') === column);
          return (
            <KanbanColumn key={column} column={column} items={columnItems} />
          );
        })}
      </div>
      <DragOverlay>
        {activeItem ? (
          <div className="bg-background border border-primary p-4 rounded-xl shadow-xl opacity-90 scale-105 rotate-2 cursor-grabbing w-[300px]">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-sm text-foreground">{activeItem.subject}</h4>
              <div className="text-[10px] text-muted-foreground">{new Date(activeItem.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="text-xs text-muted-foreground line-clamp-3 mb-3">{activeItem.message}</div>
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-foreground">{activeItem.name}</div>
              <div className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{activeItem.category || 'General'}</div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
