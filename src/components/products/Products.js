import {Component, React} from "react";
import {getCategories, getProducts} from "../../PathResolver";


class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        getProducts().then(x => {
            getCategories().then(y => {
                x.data.map(z => z.category = y.data.categories.find(w => w.id === z.categoryId))
                this.setState({products: x.data});
            });
        }).catch(error => console.log(error.response?.data.message));
    }

    render() {
        return <div style={{textAlign: "left"}}>
            <a href="/">Home</a>

            <ul style={{width: "fit-content", textAlign: "left"}}>
                {this.state.products.map(x => <li>Product: <a href={"products/" + x.id}>{x.name}</a></li>)}
            </ul>
            <a href="/products/form">Add</a>
        </div>;
    }

}

export default Products
