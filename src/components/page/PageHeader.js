import * as React from "react";

import "./assets/Page.css";

export default class PageHeader extends React.Component {
    render() {
        const links = this.props.links;
        return (
            <div className="asui-page-header">
                <a href="/" className="image">{}</a>
                {links ? <div className="links">
                    {links.map(([href, title], i) => {
                        const props = {
                            href
                        };
                        if(this.props.currentPath === href)
                            props.className = 'selected';
                        if( /^https?:\/\//i.test(href))
                            props.target = '_blank';
                        return <a key={i} {...props}>{title}</a>
                    } )}
                </div> : null}
            </div>

        );
    }

}
