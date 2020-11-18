import React, { Fragment, useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Menu from './components/menu';
import Login from './pages/login';
import Main from './pages/main';
import RecipePage from './pages/recipePage';
import SharedRecipePage from './pages/sharedRecipePage';
import IngredientsAndUtensils from './pages/ingredientsAndUtensils';
import SharedRecipes from './pages/sharedRecipes';
import RecipeForm from './pages/recipeForm';
import Register from './pages/register';
import { AuthContext } from './context/auth';
import NotAuthRoute from './utils/notAuthRoute';
import { setAccessToken } from './utils/accessToken';
import { transport } from './axios/cookieAxios';
import AuthRoute from './utils/authRoute';
import axios from 'axios';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const { loginUser } = useContext(AuthContext);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const reciveData = async () => {
      await transport({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cancelToken: source.token,
        url: 'http://localhost:5000/token/refresh_token'
      })
        .then(res => {
          setAccessToken(res.data.accessToken);
          loginUser().then(() => {
            setLoading(false);
          });
        })
        .catch(err => {
          console.error(err.message);
          setLoading(false);
        });
    };
    reciveData();
    return () => {
      source.cancel('canceled');
    }
  }, [loginUser]);
  if (loading) {
    return <div>Loading ...</div>
  }
  return (
    <Fragment>
      {!loading && (
        <Router>
          <Menu />
          <Switch>
            <AuthRoute exact path='/Main' component={Main} />
            <AuthRoute exact path='/IngredientsAndUtensils' component={IngredientsAndUtensils} />
            <AuthRoute exact path='/SharedRecipes' component={SharedRecipes} />
            <AuthRoute exact path='/RecipeForm' component={RecipeForm} />
            <AuthRoute exact path='/RecipePage/:id' component={RecipePage} />
            <AuthRoute exact path='/SharedRecipePage/:id' component={SharedRecipePage} />
            <NotAuthRoute exact path='/' component={Login} />
            <NotAuthRoute exact path='/Register' component={Register} />
          </Switch>
        </Router>
      )}
    </Fragment>
  )
}

export default App;
