const str =  "- [ ] [app.js] : testing the bot\n- [ ] [app.js] : to add am error view"
const arr = str.split(`\n`);
// console.log(arr);

const fileArr = arr.map(comment => {
    const reg = /[\[\]-]+/g;
    // const file = comment.match(reg);    
    console.log(comment.split(`:`)[0].replace(/\s/g, "").replace(reg, ""));
    //return file;
});
console.log(fileArr);
