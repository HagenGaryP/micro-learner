/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as AllProducts } from './AllProducts';
export { LandingPage } from './LandingPage';
export { MenuSlide } from './MenuSlide'
export { default as ProductPreview } from './ProductPreview';
export { default as SingleProduct } from './SingleProduct';
export { default as AddProduct } from './AddProduct';
export { default as AddProductForm } from './AddProductForm';
export { default as Scan } from './Scan'
export { default as ScanSuccess } from './ScanSuccess'
