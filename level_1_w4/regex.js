let invalidEmail = "amir@@@gmail......com"
let validEmail = "amir@gmail.com"

let myString = 'hi ther my name is Amir and amir'
// will return null if no match found

console.log("no characters")
console.log(myString.match(/mir/))
console.log("i")
console.log(myString.match(/Amir/i)) // i >> case insensitive
console.log("g")
console.log(myString.match(/Amir/g)) // g >> global
console.log("m")
console.log(myString.match(/Amir/m)) // m >> multilines
console.log("ig")
console.log(myString.match(/Amir/ig)) // we can compind regex too


let tld = "Com Net Org Info Code Io";
let tlRe = /(code|info|io)/i;   // find values that mathcs any of these in the brackets, and the i flag for case insenstive
console.log(tld.match(tlRe));

let tlReGlobal = /(code|info|io)/ig; // the g flag for getting all occurances
console.log(tld.match(tlReGlobal));

let nums = '12345678910';
console.log(nums.match(/[1-9]/));  // return ther first number in range from 1 to 9 >> 1
console.log(nums.match(/[4-7]/g)); // all numbers from 4 to 7
console.log(nums.match(/[^4-7]/g)); // all number not from 4 to 7
console.log(nums.match(/[0-9]/g));


let specialNums = '123@4#536a7$8%9'
console.log(specialNums.match(/[^0-9]/g));

let practice = 'os1 os1os os2 os8 os8os';
console.log(practice.match(/os[5-9]os/g));


let mystr = "amfieaA@#$%iofsd$%^&aADfd7465132746513dfD#$%^&*()FSDFSDrf(*&^%)eoafs#$%^&dfsd"
let atozSmall = /[a-z]/g;
let notAtoZSmall = /[^a-z]/g;
console.log(mystr.match(atozSmall));
console.log(mystr.match(notAtoZSmall));

let atozCapital = /[A-Z]/g;
let notAtoZCapital = /[^A-Z]/g;
console.log(mystr.match(atozCapital));
console.log(mystr.match(notAtoZCapital));

console.log(mystr.match(/[abcF]/g)); //return any char at abcF


console.log(mystr.match(/([a-z]|[A-Z])/g)); //return any char capital or small
console.log(mystr.match(/[a-zA-Z]/g)); //return any char capital or small but shorter


console.log(mystr.match(/[^a-zA-Z]/g)); //return any char not capital or small but shorter


console.log(mystr.match(/[^a-zA-Z0-9]/g)); //return only special characters


/*
regular expression
chareacter classes
    . => match any character, except newline or other line terminators

    \w => matchs word character [a-z, A-z, 0-9 and underscore _]
    \W => matchs non word character
    
    \d => matches digits from 0 to 9
    \D => matches non digits characters

    \s => matches whitespace character
    \S => matches non whitespace character
*/

let email = 'a@@@g...com o@g.com o@g.net A@Y.com O-g.com o@s.org 1@1.com'

console.log(email.match(/./g));
console.log(email.match(/\w/g));
console.log(email.match(/\w@\w.com/g));
console.log(email.match(/\w@\w(.com|.net)/g));


/*
    \b => matches at the beginning or at the end of a word
    \B => matches not at the beginning or at the end of a word
*/
let spammers = 'sayed 15spam 25spam 35spam Spam5 osama Ahmed amir Amir'

console.log(spammers.match(/\bspam/ig)); // starts with spam
console.log(spammers.match(/spam\b/ig)); // ends with spam
console.log(spammers.match(/(\bspam|spam\b)/ig)); // starts or ends with spam
let re = /(\bspam|spam\b)/ig;

console.log(re.test(spammers)); // true
console.log(/(\bspam|spam\b)/ig.test(spammers));  // true
console.log(/(\bspam|spam\b)/ig.test("amir"));  // false

/*
qualifiers
    n+  => one or more
    n*  => zero or more
    n?  => zero or one

*/

let myValidEmail = "amiralsayed123@gmail.com ah@gmail.com o@yahoo.net";

console.log(myValidEmail.match(/\w+@(gmail|yahoo).(com|net|org)/g));
console.log(myValidEmail.match(/\w+@\w+.(com|net|org)/g));
console.log(myValidEmail.match(/\w+@\w+.\w+/g));


let newNums = '010 0110 10 150 05120 0650 350 00';
console.log(newNums.match(/0\d*0/g));

let urls = 'https://amiralsayed.tech http://www.amiralsayed.tech amiralsayed.tech';

console.log(urls.match(/https?/g)); // return http + s if exists
console.log(urls.match(/(https?:\/\/)?(www.)?\w+.\w+/g)); // return http + s if exists


// quantifiers
/*
    n{5}    => exactly 5
    n{5,}   => 5 or more => at leaset 5 for example
    n{5,10} => 5 to 10
*/

let serials = "s100s s3000s s50000s s950000s";

console.log(serials.match(/s\d{3}s/ig)) // s[3 numbeers]s
console.log(serials.match(/s\d{4,5}s/ig)) // s[4 numbeers or 5 numbers]s
console.log(serials.match(/s\d{3,6}s/ig)) // s[from 3 to 6 digits]s
console.log(serials.match(/s\d{4,}s/ig)) // s[at least 3 numbers]s


/*
    quantifiers
    $ => end of string
    ^ => start of string
    ? => zero or one
    ?= => positive lookahead
    ?! => negative lookahead
*/
let myStringg = 'We Love Programming';

let Names = '1amirZ 2AhmedZ 3Mohammed 3OsamaZ'

console.log(/ing$/ig.test(myStringg))
console.log(/aZ$/ig.test(Names))

console.log(/^we/ig.test(myStringg))
console.log(/^1/ig.test(Names))
console.log(/^\d/ig.test(Names))

console.log(Names.match(/\d\w{5}(?=z)/ig))
console.log(Names.match(/\d\w{8}(?!z)/ig))


/*
replace, reaplaceAll
*/

let newText = "We Love programming And @ Because @ Is Amazing"

console.log(newText.replace("@", "JavaScript"))
console.log(newText.replaceAll("@", "JavaScript"))
console.log(newText.replaceAll(/@/ig, "JavaScript"))


