import {Component, React} from "react";
import {getCategory, getProduct, removeProduct} from "../../PathResolver";
import {withRouter} from "react-router";

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: null,
        }
    }

    componentDidMount() {
        getProduct(this.props.match.params.id).then(x =>
            getCategory(x.data.categoryId).then(y => {
                x.data.category = y.data;
                this.setState({product: x.data})
            }).catch(error => {
                this.setState({product: x.data})
            })).catch(error => console.log(error.response.data.message));
    }

    removeAndRedirect = (id) => {
        removeProduct(id);
        window.location.href="/products";
    }

    render() {
        return (
            <div style={{textAlign: "left"}}>
                <a href="/products">Back to products</a>

                <p>Name: {this.state.product?.name}</p>
                <p>Code: {this.state.product?.code}</p>
                <p>Description: {this.state.product?.description}</p>
                <p>Price: {this.state.product?.value} PLN</p>
                <p>Create date: {
                    new Date(this.state.product?.createDate).toLocaleString()
                }</p>
                <p>Category: {this.state.product?.category?.name}</p>
                <a href={"/products/" + this.state.product?.id + "/modify"}>Modify</a>  &nbsp;
                <a href="#" onClick={() => this.removeAndRedirect(this.state.product?.id)}>Remove</a>
            </div>);
    }

}

export default withRouter(Product)