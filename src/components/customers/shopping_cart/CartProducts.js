import {Component, React} from "react";
import {addToCart, getProducts} from "../../../PathResolver";
import {withRouter} from "react-router";

class CartProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            quantity: 1
        }
    }

    showProducts() {
        getProducts().then(x => {
            this.setState({products: x.data});
        })
    }

    myChangeHandler = (event, name) => {
        this.setState({[name]: event.target.value});
    }

    addToCart(e, prdId, cartId) {
        e.preventDefault();
        addToCart(cartId, {shcId: cartId, prdId: prdId, quantity: this.state.quantity})
            .catch(error => console.log(error.response.data.message)).then(() => window.location.href="/customers/" + this.props.match.params.cId + "/shopping");
    }

    componentDidMount() {
        this.showProducts()
    }

    render() {
        return (
            <div style={{textAlign: "left"}}>
                {this.state.products.map((y, i) => <div key={i}><p>product: {y.name} <br/>price: {y.value} <br/></p>
                    <p>quantity:
                        <input type="text" defaultValue={this.state.quantity} onChange={(e) => this.myChangeHandler(e, "quantity")}/>
                    </p>
                    <input type="submit" value="Add to cart" onClick={(e) => this.addToCart(e, y.id, this.props.match.params.id)}/>
                </div>)}
            </div>);
    }
}

export default withRouter(CartProducts)