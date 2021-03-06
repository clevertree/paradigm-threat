import React from 'react';
import {
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './server/serviceWorker';
import AssetBrowserPage from "./browser/page/AssetBrowserPage";

const refRouter = React.createRef();
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter
            ref={refRouter}
        >
            <Switch>
                <Route path={'/'} >
                    {props => <AssetBrowserPage fullscreen {...props}/>}
                </Route>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

document.addEventListener('click', function(e) {
    let target = e.target;
    while(target && target.nodeName.toLowerCase() !== 'a') {
        target = target.parentNode;
    }
    if(target
        && target.nodeName.toLowerCase() === 'a'
        && target.target !== '_blank') {
        // console.log("Click target: ", target);

        const url = new URL(target.href);
        if(url.origin !== window.location.origin) {
            target.setAttribute('target', '_blank');
            // Allow navigation
        } else if(url.hash
            || url.pathname.endsWith('.pdf')
        ) {

            // Allow local navigation
        } else {
            e.preventDefault();
            // console.log('click', target, url);
            // let history = useHistory();
            refRouter.current.history.push(url.pathname);
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
})

console.log("Dev mode: ", process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
    let lastScroll = null;
    setInterval(function() {
        let hash = document.location.hash;
        // console.log(window.scrollY, hash, lastScroll)
        if(lastScroll === null) {
            if(hash) {
                const scroll = parseFloat(hash.substr(1));
                if(!isNaN(scroll)) {
                    // console.log("Updating scroll: ", scroll)
                    window.scrollTo(0, scroll);
                }
            }
        }
        if(window.scrollY !== lastScroll) {
            document.location.hash = window.scrollY;
            lastScroll = window.scrollY;
            // console.log("Updating lastScroll: ", lastScroll)
        }
    }, 1000)
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
