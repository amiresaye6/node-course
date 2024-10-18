import U, {hi as HI, idGenerator} from './modules.js';


// nameSpaced, >> import everything from a file and attach it to a name

import * as myName from './nameSpaceFile.js'

// import from the combined file

import {amir as aa} from './compine.js'
import {mod} from './compine.js'

console.log(aa.Amir);
console.log(mod.idGenerator().next());



myName.hiii()

console.log(new myName.Amir());


const amir = new U("amir", 19, "amir@gmail.com")

amir.login()
amir.logout()

HI(amir.name)
const data = idGenerator()

console.log(data.next());

console.log(data.next());

console.log(data.next());

console.log(data.next());

console.log(data.next());


// conditional import ((dynamic import))

if (true) {
    const {amir, mod} = await import('./compine.js')
    console.log(new amir.Amir("amir", 23, "amiralsayed@gmail.co"));

    console.log(mod.idGenerator().next().value);
}

const promisses = Promise.all(
    [
        await import('./modules.js'),
        await import('./compine.js')
    ]
)

// console.log(promisses);

promisses.then(r => console.log(r));
