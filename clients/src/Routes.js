import React, { useState, useEffect  } from "react";
import firebase from "firebase/app";
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';


import {
  FundDetails as FundDetailsView,
  FundSetup as FundSetupView,
  NotFound as NotFoundView,
  FAQ as FAQView,
  Home as HomeView,
  FAQBSC as FAQBSCView 
  
} from './views';


const Routes = props => {
  const { ...rest } = props;
  const [portfolios, setPortfolios] = useState([])
  const [tokensMaster, setTokensMaster] = useState([])
  
  useEffect(() => {
    
      const unsubscribe = firebase
      .firestore()
      .collection('xwinfunds')
      //.where('env', '==', "kovan")
      .onSnapshot((snapshot) => {
        const newValues = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setPortfolios(newValues);
      })
      return () => { unsubscribe() }

  }, [])

  useEffect(() => {
    
    const unsubscribe = firebase
    .firestore()
    .collection('tokens')
    //.where('env', '==', "bsctest")
    .onSnapshot((snapshot) => {
      const newValues = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      //console.log(newValues)
      setTokensMaster(newValues);
    })
    return () => { unsubscribe() }
  
  }, [])

  return (
    <Switch>

      <RouteWithLayout exact path="/">
        <Redirect to="/home"/>
      </RouteWithLayout>
     
      <RouteWithLayout
        portfolios={portfolios}
        tokensMaster={tokensMaster}
        component={FundSetupView}
        exact
        layout={MainLayout}
        path="/funds"
      />
       <RouteWithLayout
        //id={id}
        portfolios={portfolios}
        tokensMaster={tokensMaster}
        component={FundDetailsView}
        exact
        layout={MainLayout}
        path="/funddetails/:id"
      />
      <RouteWithLayout
        component={FAQView}
        exact
        layout={MinimalLayout}
        path="/faq"
      />
      <RouteWithLayout
        component={FAQBSCView}
        exact
        layout={MinimalLayout}
        path="/faqbsc"
      />
      <RouteWithLayout
        component={HomeView}
        exact
        layout={MinimalLayout}
        path="/home"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      
      <Redirect to="/not-found"/>
      
    </Switch>
  );
};

export default Routes;
