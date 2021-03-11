import reducer from './auth';

describe('checking the reducer functionreturns',()=>{
    it("should return the initial state",()=>{
        expect(reducer(undefined,{})).toEqual({
            token:null,
            userId:null,
            error:null,
            loading:false,
            authRedirectpath:'/'
        })
    })
});