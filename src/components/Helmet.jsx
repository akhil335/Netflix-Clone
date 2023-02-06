import React from 'react';
import { Helmet } from 'react-helmet-async';

export function PageTitle({title}) {
    return (
        <Helmet>
          <title>{ title }</title>
        </Helmet>
    )
}