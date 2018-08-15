import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    marginTop: theme.spacing.unit * 2
  },
  tag: {
    padding: theme.spacing.unit / 2,
    width: 'unset'
  }
});

function TagsList(props) {
  const { classes } = props;

  return (
    <List className={classes.tagsContainer}>
      {['C#', 'Docker', 'Angular', 'Linux', 'Windows'].map(r => (
        <ListItem key={r} className={classes.tag}>
          <Chip label={r} />
        </ListItem>
      ))}
    </List>
  );
}

export default withStyles(styles)(TagsList);
