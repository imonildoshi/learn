 import * as demo from '../services/demo';

test('adds 1 + 2 to equal 3', () => {
    expect(demo.sum(1, 2)).toBe(3);
});