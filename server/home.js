let selectedEmotions = "['Happy','Sad']"; 
let emotionsArray = JSON.parse(selectedEmotions.replace(/'/g, '"'));
let emotionsStringSQL = emotionsArray.map(emotion => `'${emotion}'`).join(', ');
console.log(emotionsStringSQL)

let y = []
let a =8
let array = [1,2,3,4,5,6,7,8]
 y=array.filter(value => {
    if (value === a) {
     }
     console.log(y)
})
