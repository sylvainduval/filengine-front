import React from "react";

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
	const { numSelected, classes, actions } = props;

	let actionsToolTips = []

	for (let i in actions) {
		if (actions[i].selection && numSelected > 0)
			actionsToolTips.push(actions[i]);
			
		if (!actions[i].selection && numSelected === 0)
			actionsToolTips.push(actions[i]);
	}

	return (
		<Toolbar
			className={classNames(classes.root, {
			[classes.highlight]: numSelected > 0,
		})}
		>
			<div className={classes.title}>
				{numSelected > 0 ? (
					<Typography color="inherit" variant="subheading">
						{numSelected} selected
					</Typography>
				) : (
					<Typography />
				)}
			</div>
			<div className={classes.spacer} />
			<div className={classes.actions}>
				{actionsToolTips.map(a => (
					a.field ? (
						<span className="ml-3" key={a.title}>{a.icon}</span>
					) : (
						<Tooltip key={a.title} title={a.title}>
							<IconButton className="ml-3" aria-label={a.label} onClick={a.onClick} color={a.color ? a.color : 'default'}>
								{a.icon}
							</IconButton>
						</Tooltip>
					)
				))}
			</div>
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);