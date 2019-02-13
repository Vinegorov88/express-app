//функция която избира само уникалните ключове
function uniqueKey(string){
  let symbols = "";
  for(let i = 0; i < string.length; i ++){
    let char = string[i];
    if(symbols.indexOf(char) == -1) symbols += char;      
  }
  return symbols;
}  
console.log(uniqueKey("a bbbca b568 b"));
 
 
 
 
 //функция която връща пройзволен низ от букви и числа
function randomString(length){ 
  let string = "";
  let availableString = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";

  for(let i = 0; i < length; i ++){
    string += availableString.charAt(Math.floor(Math.random() * availableString.length));
  }
  return string;
 }
 console.log(randomString(8));



 
 //функция която проверява числото дали е 'четно' или 'нечетно'
function myFunc(number) {
  return (number % 2 == 0) ? 'Even' : 'Odd';
}
console.log(myFunc());



//функция която връща броя на думите в подадено изречение
function myFunc(sentence){
  let count = 0;
  let currentWord = "";
  let allWords = [];

  for(let i = 0; i < sentence.length; i ++){    
    let regex = /[a-zA-Z]/.test(sentence[i]);
    if(regex) currentWord += sentence[i];
    else if(currentWord.length) allWords.push(currentWord), currentWord = "";   
  }
  
  count = allWords.length;
  if(currentWord) count++;

  return count;
}
console.log(myFunc(""));




//функция която връща броя на думите в подадено изречение (съкратен вариант на горната функция)
function myFunc2(sentence) {
  return sentence.match(/\w+/g).length;
}
console.log(myFunc2(""));




//Функция която връща най-дългата дума от подаден текс
function returnTheLongestWord(text){
  let currentWord = "";
  let theLongestWord = "";

  for(let i = 0; i < text.length; i ++){    
    let regex = /[a-zA-Z0-9]/.test(text[i]);
    if(regex) currentWord += text[i]  
    else if(currentWord.length > theLongestWord.length || theLongestWord == ""){
      theLongestWord = "", theLongestWord += currentWord, currentWord = "";
    }
    else currentWord = "";    
  }

  if(currentWord.length && !theLongestWord || currentWord.length > theLongestWord.length) theLongestWord = currentWord;
  return theLongestWord;
}
console.log(returnTheLongestWord("miro, ivan, petkan, ivanov1996, viki, mimi"));




//Функция която връща повтарящите се думи от подаден текст и тяхния брой
function repetitiveWords(text){

  let currentWord = "";
  let allWords = [];
  let repetitiveWords = {};

  for(let i = 0; i < text.length; i ++){    
    let regex = /[a-zA-Z0-9]/.test(text[i]);
    if(regex) currentWord += text[i];
    else allWords.push(currentWord), currentWord = "";
  }

  if(currentWord.length) allWords.push(currentWord);  

  for (var i = 0; i < allWords.length; i++) {
    if(!repetitiveWords[allWords[i]]) repetitiveWords[allWords[i]] = 0;
    repetitiveWords[allWords[i]]++;      
  }

  repetitiveWords = Object.keys(repetitiveWords).sort((a, b) => repetitiveWords[b]-repetitiveWords[a]).reduce((obj, key) => ({...obj, [key]: repetitiveWords[key]}), {});
  return repetitiveWords;
}
console.log(repetitiveWords("pesho ivan nikola todor vladi sisi vladi ivan"));




//Функция която връща броят на подадената буква в подадения текст
function theRepeatingLetter(letter, text){
  let count = 0;
  let char;

  for(let i = 0; i < text.length; i ++){
    char = text[i];
    if(char == letter) count++;
  }
  return count;
}
console.log(theRepeatingLetter("a","bako mnogo obicha da pie ariana"));

