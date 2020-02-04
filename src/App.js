import React from 'react';
import logo from './logo.svg';
import './App.css';

class ProductCategoryRow extends React.Component {
	render() {
		const category = this.props.category;
		return (
			<tr>
			<th colSpan="2">
			{category}
			</th>
			</tr>
		);

		}
}

class ProductRow extends React.Component {
	render() {
		const product = this.props.product;
		let name = product.stocked ? product.name : <span style={{color:"red"}}> {product.name} </span>;
		return (
			<tr>
			<td>{name}</td>
			<td>{product.price}</td>
			</tr>
			);

	}

}

class ProductTable extends React.Component {
	render() {
		const products = this.props.products;
		let filterText = this.props.filterText;
		let inStockOnly = this.props.inStockOnly;
		let lastCategory;
		let renderArray = new Array();
		products.forEach(product => {
			if (product.name.indexOf(filterText) === -1) return;
			if ( inStockOnly && !(product.stocked)) return;
			if (product.category !== lastCategory) {
				renderArray.push(<ProductCategoryRow category={product.category} key = {product.category}/>);
			}
			renderArray.push(<ProductRow product={product} key = {product.name}/>);
			lastCategory = product.category;

		});
		return (
			<table>
			<thead>
			<tr>
			<th>Name</th>
			<th>Price</th>
			</tr>
			</thead>
			<tbody>{renderArray}</tbody>
			</table>
			);
	}

	
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleInStockChange = this.handleInStockChange.bind(this);
	}
	handleFilterTextChange(e) {
		this.props.onFilterTextChange(e.target.value);
		
	}
	handleInStockChange(e) {
		this.props.onInStockChange(e.target.checked);
	
	}
	render() {
		return (
			<form>
			<input type="text" placeholder = "search" value = {this.props.filterText} onChange = {this.handleFilterTextChange}/>
			<p>
			<input type = "checkbox" checked = {this.props.inStockOnly} onChange = {this.handleInStockChange}/>
			{' '}
			set in stock inStockOnly
			</p>
			</form>
			)
	}
}
class FilterableProductTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterText : '',
			inStockOnly : false
		}
		this.handleInStockChange = this.handleInStockChange.bind(this);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

	}
	handleInStockChange(inStockOnly) {
		this.setState({inStockOnly});
	}

	handleFilterTextChange(filterText) {
		this.setState({filterText});
	}
	
	render() {
		return (
		<div>
		<SearchBar onFilterTextChange = {this.handleFilterTextChange} onInStockChange = {this.handleFilterTextChange}
		filterText = {this.state.filterText} inStockOnly = {this.state.inStockOnly} />
		<ProductTable products = {this.props.products} filterText = {this.state.filterText} inStockOnly = {this.state.inStockOnly}/>
		</div>
		);
	}

			
	
}
class App extends React.Component {
	render() {
		return <FilterableProductTable products={[
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
]}  />
	}
}


export default App;