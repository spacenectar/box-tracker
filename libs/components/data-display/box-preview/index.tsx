
export type ColourOptions = 'orange' | 'blue' | 'turquoise' | 'red' | 'pink' | 'indigo' | 'purple' | 'green' | 'brown' | 'hotpink';

/* Import Types */
interface Props extends React.ComponentProps<'div'> {
  /**
   * The box name
   */
  name: string;
  /**
   * The box room
   */
  room: string;
  /**
   * The first 4 box item names
   */
  itemNames: string[];
  /**
   * The total number of items in the box
   */
  itemCount: number;
  /**
   * The boxes filled status (in percentage)
   */
  filled: number;
  /**
   * The boxes sealed status
   * @default false
   */
  sealed?: boolean;
  /**
   * The colour chosen for the box
   */
  colour: ColourOptions;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

/**
 * The `BoxPreview` component is used to display a small preview of a box.
 * It shows the box number, room, first 4 item names, total item count,
 * and filled percentage.
 */
export const BoxPreview: React.FC<Props> = ({
  name,
  room,
  itemNames,
  itemCount,
  filled,
  sealed = false,
  className,
  colour = 'blue',
  ...props
}: Props) => {
  return (
    <section
      className={[
        styles['box-preview'],
        sealed ? styles['sealed'] : '',
        styles[`colour-choice-${colour}`],
        className
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <header className={styles['header']}>
        <h2 className={styles['box-name']}>{name}</h2>
        <h3 className={styles['box-room']}>{room}</h3>
      </header>
      <ul className={styles['box-items']}>
        {itemNames.map((name, index) => (
          <li key={index} className={styles['box-item']}>
            {name}
          </li>
        ))}
        <li>{itemCount} more...</li>
      </ul>
      <footer className={styles['footer']}>
        <div className={styles['fill-bar']} style={{ width: `${filled}%` }} />
        <div
          className={styles['box-items-count']}
        >{`${itemCount} items (${filled}% full)`}</div>
      </footer>
    </section>
  );
};

export default BoxPreview;
export type { Props };
