import React from "react";
import {Link} from "gatsby";

const NavMenu = ({items, className}) => (
    items ? (
        <div className={className}>
          {items.map((entry, i) => (
              <Link
                key={`header-nav-link-${i}`}
                to={entry.url}>
                {entry.label}
              </Link>
          ))}
        </div>
    ) : null
)

export default ({title, nav, contextualNav}) => {

    return (
        <header>
          <h1>{title}</h1>
          <nav>
            <NavMenu items={nav} />
            <NavMenu items={contextualNav} className="contextual" />
          </nav>
        </header>
    )
};
