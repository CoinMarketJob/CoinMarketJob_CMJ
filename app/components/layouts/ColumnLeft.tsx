import React from 'react';
import { useDrop } from 'react-dnd';
import JobCard from '../job/Basic/JobCard';
import { Job } from '@prisma/client';
import styles from './Column.module.css'

const ItemTypes = {
  CARD: 'card',
};

interface ColumnProps {
  list: string;
  cards: Array<Job>;
  onDrop: (id: number, list: string) => void;
}

const ColumnLeft: React.FC<ColumnProps> = ({ list, cards, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: () => ({ list }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const onClick = () => {
    console.log('Clicked on column');

  }

  return (
    <div ref={drop} className={`${styles.columnLeft}`}>
      {cards.map((card) => (
        <JobCard key={card.id} job={card} onClick={onClick} onDrop={onDrop} />
      ))}
    </div>
  );
};

export default ColumnLeft;
