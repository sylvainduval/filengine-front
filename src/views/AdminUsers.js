import React from "react";
import ReactDOM from 'react-dom';

//import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
//import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
//import FilterListIcon from '@material-ui/icons/FilterList';
import Add from '@material-ui/icons/Add';
import Done from '@material-ui/icons/Done';
import Create from '@material-ui/icons/Create';

import TextField from '@material-ui/core/TextField';
//import { lighten } from '@material-ui/core/styles/colorManipulator';

import EnhancedTableHead from '../components/EnhancedTableHead';
import EnhancedTableToolbar from '../components/EnhancedTableToolbar';

import DialogMessage from '../components/DialogMessage';

import api from "../utils/api";


function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
		return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		backgroundColor: "transparent",
		boxShadow: 'none'
	},
	tableWrapper: {
		overflowX: 'auto',
	},
	searchField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
});

class AdminUsers extends React.Component {
	state = {
		order: 'asc',
		orderBy: 'login',
		selected: [],
		data: [],
		page: 0,
		rowsPerPage: 5,
		total: 0,
		searchExpr: '',
		searchPending: false
	};

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';
		
		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}
		
		this.setState({ order, orderBy });
	};

	handleSelectAllClick = event => {
		if (event.target.checked) {
			this.setState(state => ({ selected: state.data.map(n => n._id) }));
			return;
		}
		this.setState({ selected: [] });
	};

	handleClick = (event, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];
		
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		
		this.setState({ selected: newSelected });
	};
	
	handleChangePage = (event, page) => {
		this.setState({ page }, this.getList);
	};
	
	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value }, this.getList);
	};
	
	handleSearch = event => {
		const str = event.target.value;
		
		return !this.state.searchPending ? (
			this.setState({ searchExpr: str, searchPending: true }),
			setTimeout(this.getList, 700)
		) : (
			this.setState({ searchExpr: str })
		)
	};
	
	isSelected = id => this.state.selected.indexOf(id) !== -1;

	refreshList = (total, data) => {
		this.setState({
			total: total,
			data: data,
			searchPending: false
		});
	}

	getList = () => {
		
		//Si on rafraichi la liste, on annule la sélection multiple précédente
		this.setState({
			selected: []
		});


		const { page, rowsPerPage, searchExpr } = this.state;

		api.request(
			{
				refreshList: this.refreshList
			},
			{
				method: 'get',
				url: '/users',
				params: {
					search: searchExpr,
					offset: rowsPerPage * page,
					limit : rowsPerPage,
				}
			}, function(props, data, status) { //success
				props.refreshList(data.total, data.data);
			}
		)
	}
	
	deleteUsers = () => {
		const arr = this.state.selected;
		
		let done = 0;
		
		const evalResponse = () => {
			done++;
			
			if (done === arr.length) {
				this.getList();
			}
		}
		
		ReactDOM.render(
			<DialogMessage 
				title="Are you sure?" 
				description={"These "+arr.length+" account(s) will be deleted forever."}
				actions={[
					{label: "Cancel", autoFocus: true},
					{label: "Delete", onClick: function() {

						for (let i in arr) {
							api.request(
								{
								},
								{
									method: 'delete',
									url: '/user/'+arr[i]
								}, 
								evalResponse, //success
								evalResponse //error
							)
						}
					}
					}
				]}
				 />,
				document.getElementById('dialogMessage')
			);
		
	} 
	
	
		
	componentDidMount() {
		this.getList();
	}
	
	render() {
		const { classes } = this.props;
		const { data, order, orderBy, selected, rowsPerPage, page, total, searchExpr } = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, total - page * rowsPerPage);
	
		const rows = [
			{ id: 'login', numeric: false, disablePadding: true, label: 'Login' },
			{ id: 'email', numeric: false, disablePadding: false, label: 'Email' },
			{ id: 'isAdmin', numeric: false, disablePadding: false, label: 'Administrator' },
			{ id: 'isContributor', numeric: false, disablePadding: false, label: 'Contributor' },
			{ id: 'actions', numeric: false, disablePadding: false, label: null },
		];
	
		const toolBarActions = [
			{
				title: "Delete",
				label: "Delete",
				onClick: this.deleteUsers,
				icon: <DeleteIcon />,
				selection: true
			},
			{
				title: "searchExpr",
				label: "Search",
				textField: true,
				icon: <TextField
		          id="standard-name"
		          label="Search"
		          className={classes.searchField}
		          value={searchExpr}
		          onChange={this.handleSearch}
		          margin="normal"
		        />
			},
			{
				title: "Add user",
				label: "Add user",
				icon: <Add />
			}
		]


		return (
			<Paper className={classes.root+" mt-0"}>
				<EnhancedTableToolbar 
					numSelected={selected.length} 
					actions={toolBarActions}
				/>
				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="Users">
						<EnhancedTableHead
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={this.handleSelectAllClick}
						onRequestSort={this.handleRequestSort}
						rowCount={data.length}
						rows={rows}
						/>
						<TableBody>
							{stableSort(data, getSorting(order, orderBy))
							.map(n => {
								const isSelected = this.isSelected(n._id);
							
								return (
									<TableRow
									hover
									onClick={event => this.handleClick(event, n._id)}
									role="checkbox"
									aria-checked={isSelected}
									tabIndex={-1}
									key={n._id}
									selected={isSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox checked={isSelected} />
										</TableCell>
										<TableCell component="th" scope="row" padding="none">
											{n.login}
										</TableCell>
										<TableCell>{n.email}</TableCell>
										<TableCell>{n.isAdmin ? <Done /> : null}</TableCell>
										<TableCell>{n.isContributor ? <Done /> : null}</TableCell>
										<TableCell numeric>
											<Tooltip title="Edit">
												<IconButton 
													aria-label="Edit" 
													onClick={event => {console.log('edit '+n._id);event.stopPropagation();}}
												>
													<Create />
												</IconButton>
											</Tooltip>
										</TableCell>
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
							<TableRow style={{ height: 49 * emptyRows }}>
							<TableCell colSpan={6} />
							</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					component="div"
					count={total}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page',
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page',
					}}
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
				/>
			</Paper>
		);
	}
}

AdminUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminUsers);