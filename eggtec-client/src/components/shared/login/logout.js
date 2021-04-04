function Logout(props) {

    // clear auth token
    localStorage.removeItem("auth");

    // reload navigation
    window.location.reload();

    // redirect to login
    window.location.href = '/';

    return "You are logged out";
}

export default Logout;