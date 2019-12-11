import Insomnia from '../exporters/insomnia/insomnia'

describe('Test buildQueryArgs', function() {
    it('returns empty string for empty arguments', function () {
        let insomnia = new Insomnia()
        let result = insomnia.buildQueryArgs([]);
        expect(result).toBe("");
    });
});
