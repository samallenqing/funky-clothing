import React from 'react';
import {connect} from "react-redux";
import {Redirect, Route, Switch} from 'react-router-dom';
import {createStructuredSelector} from "reselect";

import './App.css';

import Header from './components/header/header.component';
import CheckoutPage from "./pages/checkout/checkout.component";
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {selectCurrentUser} from "./redux/user/user.selector";
import {checkUserSession} from "./redux/user/user.action";

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {

        const {checkUserSession} = this.props;

        checkUserSession();

        // const {setCurrentUser} = this.props;

        // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        //     if (userAuth) {
        //         const userRef = createUserProfileDocument(userAuth);
        //         (await userRef).onSnapshot(snapshot => {
        //             setCurrentUser({
        //                 id: snapshot.id,
        //                 ...snapshot.data()
        //             })
        //         })
        //     }
        //
        //     setCurrentUser(userAuth);
        // Only fire once to upload data into firebase.
        // addCollectionAndDocuments("collections", collectionsArray.map(({title, items}) => ({title, items})))
        // });


    }


    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route path='/checkout' component={CheckoutPage}/>
                    <Route path='/signin'
                           render={() => this.props.currentUser ? (<Redirect to='/'/>) : <SignInAndSignUpPage/>}/>
                </Switch>
            </div>
        );
    }
}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
