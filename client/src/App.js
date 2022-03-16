import {
    Cart,
    Dashboard,
    Footer,
    NavBar,
    Orders,
    Profile,
    CreateProduct,
    AuthRoute,
    UserRoleRoute,
    ProductDetail,
    MyProducts,
    ScrollTop,
    UpdateProduct,
    SoldProducts
} from "./components";
import { Home, Products, SignIn, SignUp } from "./pages";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
    const { isAuth } = useSelector((state) => state.login);

    return (
        <>
            <Router>
                <ScrollTop />
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/signin">
                        <SignIn />
                    </Route>
                    <Route
                        exact
                        path="/signup"
                        render={() =>
                            isAuth ? (
                                <Redirect to="/user/dashboard" />
                            ) : (
                                <SignUp />
                            )
                        }
                    />
                    <Route exact path="/cart">
                        <Cart />
                    </Route>
                    <Route exact path="/products">
                        <Products />
                    </Route>
                    <Route exact path="/products/product/:id">
                        <ProductDetail />
                    </Route>
                    <AuthRoute exact path="/user/dashboard" comp={Dashboard} />
                    <AuthRoute exact path="/user/profile" comp={Profile} />
                    <UserRoleRoute
                        exact
                        path="/user/orders"
                        comp={Orders}
                        role="buyer"
                    />
                    <UserRoleRoute
                        exact
                        path="/user/soldproducts"
                        comp={SoldProducts}
                        role="seller"
                    />
                    <UserRoleRoute
                        exact
                        path="/user/addproduct"
                        comp={CreateProduct}
                        role="seller"
                    />
                    <UserRoleRoute
                        exact
                        path="/user/myproducts/product/:id"
                        comp={UpdateProduct}
                        role="seller"
                    />
                    <UserRoleRoute
                        exact
                        path="/user/myproducts"
                        comp={MyProducts}
                        role="seller"
                    />
                </Switch>
            </Router>
            <Footer sx={{ mt: 8, mb: 4 }} />
        </>
    );
}

export default App;
