import {useDroppable} from '@dnd-kit/core';
import { FC, ReactNode } from 'react';
import { Title } from '@mantine/core';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import classes from "./Day.module.css"
interface DayProps {
    id: string;
    day?: string;
    children?: ReactNode
}

const InbetweenSlot = () => {
    const { arrow, up, down, "inbetween-line": inbetweenLine, inbetween, 
    "inbetween-arrow-wrap": inbetweenArrowWrap
     } = classes
    return (
        <div className={inbetween}>
            <div className={inbetweenArrowWrap} >
                <i className={`${arrow} ${down}`}></i>
            </div>
            <div className={inbetweenLine}/>
            <div className={inbetweenArrowWrap} >
                <i className={`${arrow} ${up}`}></i>
            </div>
        </div>
    )
}

export const Day: FC<DayProps> = ({ id, day, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const { wrapper, spacer } = classes
  const style = isOver ? {
    outline: "2px solid var(--mantine-color-white-2)",
    "outline-offset": "-4px"
  } : undefined;
  return (
    <div style={style} ref={setNodeRef} className={wrapper} >
      
      <Title order={2}>{day ?? id}</Title>
      <div className={spacer}></div>
      <InbetweenSlot />
      {children}
    </div>
  );
}