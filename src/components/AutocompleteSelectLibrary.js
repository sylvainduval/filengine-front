import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
//import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import api from "../utils/api.js";

let suggestions = [];

function renderInput(inputProps) {
	const { InputProps, classes, ref, ...other } = inputProps;

	return (
		<TextField
			InputProps={{
			inputRef: ref,
			classes: {
			root: classes.inputRoot,
			},
			...InputProps,
			}}
			{...other}
		/>
	);
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
	const isHighlighted = highlightedIndex === index;
	const isSelected = (selectedItem || '').indexOf(suggestion.id) > -1;
	
	return (
		<MenuItem
			{...itemProps}
			key={suggestion._id}
			selected={isHighlighted}
			component="div"
			style={{
				fontWeight: isSelected ? 500 : 400,
			}}
		>
			{suggestion.id}
		</MenuItem>
	);
}

renderSuggestion.propTypes = {
	highlightedIndex: PropTypes.number,
	index: PropTypes.number,
	itemProps: PropTypes.object,
	selectedItem: PropTypes.string,
	suggestion: PropTypes.shape({ id: PropTypes.string }).isRequired,
};

function getSuggestions(value) {
	const inputValue = deburr(value.trim()).toLowerCase();
	const inputLength = inputValue.length;
	let count = 0;

	return inputLength === 0
	? []
	: suggestions.filter(suggestion => {
		const keep =
			count < 4 && suggestion.id.slice(0, inputLength).toLowerCase() === inputValue;
		
		if (keep) {
			count += 1;
		}
		
		return keep;
	});
}

class AutocompleteSelectLibrary extends React.Component {
	state = {
		inputValue: '',
		selectedItem: []
	};

	handleKeyDown = event => {
		const { inputValue, selectedItem } = this.state;
		if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
			this.setState({
				selectedItem: selectedItem.slice(0, selectedItem.length - 1),
			});
		}
	};

	handleInputChange = event => {
		this.setState({ inputValue: event.target.value });
	};

	handleChange = item => {
		let { selectedItem } = this.state;
		
		if (selectedItem.indexOf(item) === -1) {
			selectedItem = [...selectedItem, item];
		}
		
		this.setState({
			inputValue: '',
			selectedItem,
		});
		
		
	};

	handleDelete = item => () => {
		this.setState(state => {
			const selectedItem = [...state.selectedItem];
			selectedItem.splice(selectedItem.indexOf(item), 1);
			return { selectedItem };
		});
	};
	
	componentDidMount() {		
		api.request(
			{
				method: 'get',
				url: '/libraries',
				data: {}
			}, function(data, status) { //success
				suggestions = data.data;
			});
	}

	componentWillReceiveProps(nextProps) {
		let { selectedItem } = this.state;
		for (const item of nextProps.list) {
			if (selectedItem.indexOf(item.id) === -1) {
				selectedItem = [...selectedItem, item.id];
			}
		}
		this.setState({
			selectedItem,
		});
	}
		
	componentDidUpdate() {
		this.props.onChange(this.state.selectedItem);
	}

	render() {
		const { classes } = this.props;
		const { inputValue, selectedItem } = this.state;

		return (
			<div className={classes.root}>
				<Downshift
					id="downshift-multiple"
					inputValue={inputValue}
					onChange={this.handleChange}
					selectedItem={selectedItem}
				>
					{({
						getInputProps,
						getItemProps,
						isOpen,
						inputValue: inputValue2,
						selectedItem: selectedItem2,
						highlightedIndex,
					}) => (
						<div className={classes.container}>
							{renderInput({
								fullWidth: true,
								classes,
								InputProps: getInputProps({
									startAdornment: selectedItem.map(item => (
										<Chip
											key={item}
											tabIndex={-1}
											label={item}
											className={classes.chip}
											onDelete={this.handleDelete(item)}
										/>
										)),
									onChange: this.handleInputChange,
									onKeyDown: this.handleKeyDown,
									placeholder: selectedItem.length === 0 ? 'Select multiple libraries' : '',
								}),
								label: 'Libraries',
							})}
							{isOpen ? (
								<Paper className={classes.paper} square>
									{getSuggestions(inputValue2).map((suggestion, index) =>
										renderSuggestion({
											suggestion,
											index,
											itemProps: getItemProps({ item: suggestion.id }),
											highlightedIndex,
											selectedItem: selectedItem2,
										}),
									)}
							  </Paper>
							) : null}
						</div>
					)}
				</Downshift>
			</div>
		);
	}
}

AutocompleteSelectLibrary.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
	root: {
		flexGrow: 1,
		/*height: 150*/
	},
	container: {
		flexGrow: 1,
		position: 'relative',
	},
	paper: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0,
	},
	chip: {
		margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
	},
	inputRoot: {
		flexWrap: 'wrap',
	}
});

AutocompleteSelectLibrary.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutocompleteSelectLibrary);