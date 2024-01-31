import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AppBreadCrumb.css';

const AppBreadCrumb = () => {
  const location = useLocation();

  // Define an array of paths where you want to hide the breadcrumbs
  const pathsToHideBreadcrumbs = ['/login', '/registration','/carts'];

  // Check if the current path is in the array of paths to hide breadcrumbs
  const shouldHideBreadcrumbs = pathsToHideBreadcrumbs.includes(location.pathname);

  // If shouldHideBreadcrumbs is true, return null to hide breadcrumbs
  if (shouldHideBreadcrumbs) {
    return null;
  }

  const crumPath = location.pathname
    .split('/')
    .filter((path) => path !== '')
    .map((crumb, index, array) => {
      const crumbLink = `/${array.slice(0, index + 1).join('/')}`;
      return (
        <span key={crumb}>
          {index === 0 && <Link to='/'>Home</Link>}
          {' / '}
          {index > 0}
          {index < array.length - 1 ? (
            <Link to={crumbLink}>{crumb}</Link>
          ) : (
            <span>{crumb}</span>
          )}
        </span>
      );
    });

  return <div className='crum' style={{ marginBottom: '80px' }}>{crumPath}</div>;
};

export default AppBreadCrumb;
