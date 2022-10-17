
import { expect } from 'chai';
import { dragger } from '../src/dragger.js'

describe('Elements passed to dragger initialization', function () {
    it('should throw error if they are not in an array', function () {
        expect(()=>dragger('notanarray')).to.throw('elements must be in a NodeList')
        expect(()=>dragger(0)).to.throw('elements must be in a NodeList')
        expect(()=>dragger(null)).to.throw('elements must be in a NodeList')
    });
});