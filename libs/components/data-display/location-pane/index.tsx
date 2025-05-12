/* Import Stylesheet */
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import Grid from '../../layout/grid';
import BoxPreview, { ColourOptions } from '../box-preview';
import AddBox from '../../data-input/add-box';

/* Import Types */
import type { Location } from '@typeDefs/location';
import type { Box } from '@typeDefs/box';

interface Props extends React.ComponentProps<'section'> {
  /**
   * The location object
   */
  locationData: Location;
  /**
   * The Box list
   */
  boxes: Box[];
  /**
   * Callback function when the add box button is clicked
   */
  onAddBoxClick: () => void;
}

/**
 * The LocationPane Component displays a location and its boxes/items.
 */
export const LocationPane: React.FC<Props> = ({
  className,
  locationData,
  boxes,
  onAddBoxClick,
  ...props
}) => {

    const [location, setLocation] = useState<Location | null>(null);
    const [boxList, setBoxList] = useState<Box[] | []>([]);

    useEffect(() => {
      setLocation(locationData);
      setBoxList(boxes)

    }, [locationData, boxes]);

  return (
    <section
      className={[
        styles['location-pane'],
        className
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <header className={styles['header']}>
        <h2 className={styles['title']}>{location?.name}</h2>
        <span className={styles['address']}>{location?.address || <>&nbsp;</>}</span>
      </header>
      <div className={styles['pane-contents']}>
        <Grid columns={3}>
          {boxList?.map((box) => (
            <BoxPreview key={box.id} name={box.name} room={box.room} itemNames={box.items.map((item) => item.name)} itemCount={box.items.length} filled={box.items.length / 100} colour={box.colour as ColourOptions} />
          ))}
          <AddBox onClick={onAddBoxClick} />
        </Grid>
      </div>
    </section>
  );
};

export default LocationPane;
