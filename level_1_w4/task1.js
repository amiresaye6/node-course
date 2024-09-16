const { join } = require("path")

const filterFunction = (arr) => {
    return arr.filter(value => {
        return /^hand\w*(s|y|le)$/ig.test(value);
    })
}

console.log(filterFunction(['handOn', 'hands', 'hanDLes', 'Handcuffs', 'handmade', 'in-hands', 'HANDINGLY'])
)
