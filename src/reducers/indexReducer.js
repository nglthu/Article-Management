var index = require("../constants/index.json")


export default function (
    state={
        index: ""
    },action)
{
    switch(action.type){
        case "DEFAULT_STATE":
            state = {...state, index: index.home}
            break;
    }
    
    return state;
}
    