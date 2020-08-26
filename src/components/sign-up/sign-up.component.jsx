import React from "react";
import {connect} from "react-redux"
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss'
import {singUpStart} from "../../redux/user/user.action";

class SignUP extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {signUpStart} = this.props;
        const {displayName, email, password, confirmPassword} = this.state;


        if (password !== confirmPassword) {
            alert("passwords does not match");
            return;
        }

        signUpStart({displayName, email, password})

        // try {
        //     const {user} = await auth.createUserWithEmailAndPassword(email, password);
        //
        //     await createUserProfileDocument(user, {displayName});
        //     this.setState({
        //         displayName: '',
        //         email: '',
        //         password: '',
        //         confirmPassword: ''
        //     })
        // } catch (error) {
        //     console.error(error)
        // }
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value})
    };


    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput type='text'
                               name='displayName'
                               value={displayName}
                               onChange={this.handleChange}
                               label='Display Name'
                               required/>
                    <FormInput type='text'
                               name='email'
                               value={email}
                               onChange={this.handleChange}
                               label='Email'
                               required/>
                    <FormInput type='password'
                               name='password'
                               value={password}
                               onChange={this.handleChange}
                               label='password'
                               required/>
                    <FormInput type='password'
                               name='confirmPassword'
                               value={confirmPassword}
                               onChange={this.handleChange}
                               label='confirmPassword'
                               required/>
                    <CustomButton type='submit'>Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(singUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUP)