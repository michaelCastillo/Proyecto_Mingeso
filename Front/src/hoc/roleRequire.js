import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * HOC that Handles whether or not the user is allowed to see the page.
 * @param {array} allowedRoles - user roles that are allowed to see the page.
 * @returns {Component}
 */

export default function Authorization(allowedRoles) {
    return (WrappedComponent) => {
      const WithAuthorization = (props) => {
        const role = localStorage.getItem('role');
        if (allowedRoles.includes(role)) {
          return <WrappedComponent {...props} />;
        }
        return <h1> No tiene permiso de ingresar a esta página! {role} 
                <br/>
                <br/>
                <Link to='/' > Salir </Link> 
                </h1>; // Redirect actually
      };
      function mapStateToProps(state) {
        return { permission: state.auth.permission };
      }
     
      // return connect(state => ({ user: state.user.user }))(WithAuthorization);
      return connect(mapStateToProps)(WithAuthorization);
    };
  }