
/* Import Stylesheet */
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import Grid from '@components/layout/grid';
import BoxPreview from '@components/data-display/box-preview';

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
}


export const LocationPane: React.FC<Props> = ({ className, locationData, boxes, ...props }) => {

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
        {location?.address && <span className={styles['address']}>{location?.address}</span>}
      </header>
      <div className={styles['pane-contents']}>
        <Grid columns={3}>

        </Grid>
      </div>
    </section>
  );
};
