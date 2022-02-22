import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { DocSearch } from "@docsearch/react";

import "@docsearch/css";

function SearchBar() {
    const { siteConfig } = useDocusaurusContext();

    return <DocSearch {...siteConfig.themeConfig.algolia}/>;
}
export default SearchBar;
