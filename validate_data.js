import { services, shopItems } from './src/data/shopData.js';

console.log('Services loaded:', services.length);
console.log('ShopItems loaded:', shopItems.length);

services.forEach(s => {
    console.log(`Service: ${s.id}, Catalog: ${s.catalog ? s.catalog.length : 'NONE'}`);
});

shopItems.forEach(s => {
    console.log(`Item: ${s.id}, Catalog: ${s.catalog ? s.catalog.length : 'NONE'}`);
});
