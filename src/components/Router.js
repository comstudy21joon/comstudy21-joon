import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import List from "routes/List";
import Navigation from './Navigation';

const AppRouter = ({isLoggedIn}) => {
    // 함수의 내부 - 연산, 호출 ...
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Route exact path="/list">
                        <List />
                    </Route>
                    </>
                ) : (
                    <Route exact path="/">
                        <Auth></Auth>
                    </Route>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;