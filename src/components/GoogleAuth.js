import React, {useEffect, useState} from "react";
import {signIn, signOut} from "../actions";
import {useDispatch, useSelector} from "react-redux";

const GoogleAuth = () => {
  const [auth, setAuth] = useState(null);
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state?.auth?.isSignedIn);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '215664064076-s309nn8b58k98r7ju6acafc5bmkq8mst.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        setAuth(window.gapi.auth2.getAuthInstance());
      });
    });
  }, []);

  useEffect(() => {
    const onAuthChange = (isSignedIn) => {
      if (isSignedIn) {
        dispatch(signIn(auth.currentUser.get().getId()))
      } else {
        dispatch(signOut());
      }
    }

    if (auth) {
      onAuthChange(auth.isSignedIn.get());
      auth.isSignedIn.listen(onAuthChange);
    }
  }, [auth, dispatch]);

  const onSignInClick = () => {
    auth.signIn();
  }

  const onSignOutClick = () => {
    auth.signOut();
  }

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button className="ui red google button" onClick={onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={onSignInClick}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  return (
    <div>{renderAuthButton()}</div>
  );
}

export default GoogleAuth;
