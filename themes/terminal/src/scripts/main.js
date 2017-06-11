import {baz} from './module';

const fn = () => [1,2,3].map(x => x**2);

console.log(baz, fn());