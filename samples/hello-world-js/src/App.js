/*
 * This file demonstrates a basic ReactXP app.
 */

import React from 'react';
import RX from 'reactxp';

import { Navigator } from 'reactxp-navigation';


import MainPanel from './MainPanel';
import SecondPanel from './SecondPanel';

import FormPanel from './FormPanel'

let NavigationRouteId = {
    MainPanel: "MainPanel",
    SecondPanel: "SecondPanel",
    FormPanel: "FormPanel"
};

const styles = {
    // Standard navigator style should be an object. So we have to disable caching here.
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: '#f5fcff'
    }, false)
};

export default class App extends RX.Component {
    _navigator;

    constructor(props) {
        super(props);
        this._onNavigatorRef = this._onNavigatorRef.bind(this);
        this._renderScene = this._renderScene.bind(this);
        this._onPressNavigate = this._onPressNavigate.bind(this);
        this._onPressBack = this._onPressBack.bind(this);
    }

    componentDidMount() {
        this._navigator.immediatelyResetRouteStack([{
            routeId: NavigationRouteId.MainPanel,
            sceneConfigType: "Fade"
        }]);
    }

    render() {
        return (
            <Navigator
                ref={ this._onNavigatorRef }
                renderScene={ this._renderScene }
                cardStyle={ styles.navCardStyle }
            />
        );
    }

    _onNavigatorRef(navigator) {
        this._navigator = navigator;
    }

    _renderScene(navigatorRoute) {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainPanel:
                return <MainPanel onPressNavigate={ this._onPressNavigate } onPressNavigateForm={ this._onPressNavigateForm }/>;

            case NavigationRouteId.SecondPanel:
                return <SecondPanel onNavigateBack={ this._onPressBack }/>;
            case NavigationRouteId.ThirdPanel:    
                return <FormPanel _onPressNavigateForm={ this._onPressNavigateForm } />;
        }

        return null;
    }

    _onPressNavigate() {
        this._navigator.push({
            routeId: NavigationRouteId.SecondPanel,
            sceneConfigType: "FloatFromRight",
            customSceneConfig: {
                hideShadow: true
            }
        });
    }

    _onPressNavigateForm() {
        this._navigator.push({
            routeId: NavigationRouteId.ThirdPanel,
            sceneConfigType: "FloatFromRight",
            customSceneConfig: {
                hideShadow: true
            }
        });
    }

    _onPressBack() {
        this._navigator.pop();
    }

    
};
