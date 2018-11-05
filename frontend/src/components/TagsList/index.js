import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0
  },
  tag: {
    padding: theme.spacing.unit / 2,
    width: 'unset'
  }
});

const TagsList = props => {
  const { classes, tags } = props;

  return (
    <List className={classes.tagsContainer}>
      {tags.map(r => (
        <ListItem key={r.id} className={classes.tag}>
          <Tooltip position="bottom" title={r.description}>
            <Chip label={r.value} />
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
};

TagsList.defaultProps = {
  tags: []
};
//TODO: add prop types

export default withStyles(styles)(TagsList);
