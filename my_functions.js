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





//Функция която връща най-дългата дума от подаден текс(съкратен вариант на горната функция)
function returnTheLongestWord(text) {

  let longestWord = '';
  let words = text.match(/\w+/g);

  for (let word of words) {
    if (word.length > longestWord.length) longestWord = word;
  }
  return longestWord;
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

  let count = 0, char;

  for(let i = 0; i < text.length; i ++){
    char = text[i];
    if(char == letter) count++;
  }
  return count;
}
console.log(theRepeatingLetter("a","bako mnogo obicha da pie ariana"));





//Функция която умножава всички числа от масива, без подаденото
function multiplyTheNumbers(number, arrayOfNumbers){
   
  for(let i = 0; i < arrayOfNumbers.length; i ++){
    if(arrayOfNumbers[i] != number) arrayOfNumbers[i] *= number;
  }
  return arrayOfNumbers;
}
console.log(multiplyTheNumbers(2, [5, 6, 10, 2, 8, 3]));





//Функция която приема два параметъра, дума и текст, ако думата съществува в текста, връща текста но думата с главни букви
function uniqueWord2(keyword, text){

  let words = text.match(/\w+/g);

  for(let word of words){
      if(word == keyword) text = text.replace(word, word.toUpperCase());
  }
  return text;
}
console.log(uniqueWord2("martin", "bako martin pie i zime i lete martin"));





//Функция която приема два параметъра, дума и текст, ако думата съществува в текста, връща текста но думата с главни букви (Кратък вариант на горната функция)
function uniqueWord(word, text){
  let regex = new RegExp(word, 'g');  
  return text.replace(regex, word.toUpperCase());
}
console.log(uniqueWord("martin", "bako martin pie i zime i lete martin"));





//Функция която връща колко дни остават до Нова година от сегашното време. Функцията се извиква на 24 часа
function numberOfRemainingDays(){
  let remainingDays = moment("2019-12-31").diff(moment(),"days");
  return {"Оставащи дни до Нова година": remainingDays};
}
setInterval(numberOfRemainingDays, 8.64e+7);





//Тази функция е като горната, разликата е че тук можем да си променяме датите
function numberOfRemainingDays(date){

  let oneDay = 24 * 60 * 60 * 1000;
  let lastDateОfТheYear = new Date(2019, 12, 31); 
  let remainingDays = Math.round((lastDateОfТheYear.getTime() - date.getTime()) / (oneDay));
  
  return {"Оставащи дни до Нова година": remainingDays};
}
console.log(numberOfRemainingDays(new Date(2019, 02, 18)));






//Тази функция която връща колко дни остават до нова година от сегашния ден
let nowYear = new Date().toISOString().slice(0, 10);
let nowDate = new Date(nowYear);

function numberOfRemainingDays(date){
    let oneDay, year, lastDateОfТheYear, remainingDays;

    oneDay = 24 * 60 * 60 * 1000;
    year = new Date().toISOString().slice(0, 4);
    lastDateОfТheYear = new Date(year, 12, 31);
 
    remainingDays = Math.round((lastDateОfТheYear.getTime() - date.getTime()) / (oneDay));
    
    return remainingDays - 31;
}
console.log(numberOfRemainingDays(nowDate));





//Функция която приема един параметър (текст) и връща броя на гластните и съгласните букви
function vowelOrConsonantLetter(text){

  let countVowels = 0, countConsonants = 0;
  let vowels = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'Y', 'y'];

  for(let i = 0; i < text.length; i ++){
    let letter = /[a-zA-Z]/.test(text[i]);
    if(letter){
      if(vowels.indexOf(text[i]) > -1) countVowels++;
      else countConsonants++;
    }
  }

  return [{ "Гласни букви": countVowels}, { "Съгласни букви": countConsonants}];
}
console.log(vowelOrConsonantLetter("Bako i On pie bira"));





//Функция който връща колко време остава до 00:00:00ч, след подадено време
function remTime(hour){

  let remainingHours = "";
  let remainingMinutes = "";
  let remainingSeconds = "";
  let remainingTime = "";
  let tabs = ":";

  let setTime = moment("23:59:59", ["HH:mm:ss"]).format("HH:mm:ss");

  let myHour = parseInt(moment.duration(hour).hours());
  let hours = parseInt(moment.duration(setTime).hours());
  let myMinutes = parseInt(moment.duration(hour).minutes());
  let minutes = parseInt(moment.duration(setTime).minutes());
  let mySeconds = parseInt(moment.duration(hour).seconds());
  let seconds = parseInt(moment.duration(setTime).seconds());


  if((hours - myHour) < 10) remainingHours += "0", remainingHours += hours - myHour;
  else remainingHours += hours - myHour;
  
  if((minutes - myMinutes) < 10) remainingMinutes += "0", remainingMinutes += minutes - myMinutes;
  else remainingMinutes += minutes - myMinutes;

  if((seconds - mySeconds) < 10) remainingSeconds += "0", remainingSeconds += seconds - mySeconds;
  else remainingSeconds += (seconds - mySeconds) + 1;

  if(myHour == 23 && myMinutes == 59 && mySeconds == 59) remainingSeconds++, remainingSeconds = "0" + remainingSeconds;

  if(remainingHours == 0 && remainingMinutes < 10 && remainingSeconds < 10) remainingSeconds++, remainingSeconds = "0" + remainingSeconds;
  
  if(remainingMinutes == 60) remainingHours++, remainingHours = "0" + remainingHours, remainingMinutes = "00", remainingSeconds = "00";
  
  if(remainingSeconds == 60) remainingSeconds = "00", remainingMinutes++;
  
  if(myHour == 0 && myMinutes == 0 && mySeconds == 0) remainingTime = "00:00:00";
  
  remainingTime += remainingHours, remainingTime += tabs, remainingTime += remainingMinutes, remainingTime += tabs, remainingTime += remainingSeconds;
  
  return remainingTime;
}
console.log(remTime("23:00:00"));





//Функция който връща колко време остава до 00:00:00ч, след подадено време (друг вариант на горната)
function remTime(myTime){
  let remainingTime = "", tabs = ":", zero = "0", myHour = "", myMinutes = "", mySeconds = "", hour = "", minutes = "", seconds = "";

  let setTime = [23,59,59];
  
  for(let i = 0; i < myTime.length; i ++){
    if(myHour.length < 2 && myTime[i] != tabs) myHour += myTime[i];
    else if(myMinutes.length < 2 && myTime[i] != tabs) myMinutes += myTime[i];
    else if(mySeconds.length < 2 && myTime[i] != tabs) mySeconds += myTime[i];
    else if(!seconds.length) hour += setTime[0], minutes += setTime[1], seconds += setTime[2];
  }

  parseInt(myHour, myMinutes, mySeconds, hour, minutes, seconds);
  
  let remainingHours = Math.abs(hour - myHour);
  let remainingMinutes = Math.abs(minutes - myMinutes);
  let remainingSeconds = Math.abs(seconds - mySeconds);
  
  if(remainingHours < 10) remainingHours = zero + remainingHours;
  if(remainingSeconds < 10 || remainingSeconds == 0) remainingSeconds++, remainingSeconds = zero + remainingSeconds;
  else if(remainingSeconds > 10) remainingSeconds++;
  
  if(remainingMinutes < 10 || remainingMinutes == 0) remainingMinutes = zero + zero;  
  if(remainingSeconds > 59)remainingSeconds = zero + zero, remainingMinutes++; 

  if(remainingMinutes > 59){
    remainingMinutes = zero + zero;
    if(remainingHours < 9) remainingHours++, remainingHours = zero + remainingHours;
    else if(remainingHours == 23) remainingHours = zero + zero;
    else remainingHours++;  
  }

  if(remainingHours == 24) remainingTime = "00:00:00";
  if(myTime == "23:59:59") remainingTime = "00:00:01";
  else remainingTime += remainingHours, remainingTime += tabs, remainingTime += remainingMinutes, remainingTime += tabs, remainingTime += remainingSeconds;
  
  return remainingTime;
}
console.log(remTime("23:27:30"));





//Функция която при подадено число ти връща факториела на това число
function factorial(number){
  let numbers = "", multiplication = "*", space = " ", equal = "=", sum = number, result = "";
  
  for(let i = number; i >= 1; i --)
  {  
    (i > 1) ?  numbers += i + multiplication : numbers += i; 
    sum *= i;
  }
  result += numbers + space + equal + space + sum;
  
  return result;
}
console.log(factorial(12));





//Функция която приема един параметър (число)... и връща на този индекс коя буква се намира
function returnLetter(position){
  let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  for(let i = 1; i < letters.length; i ++){
    if((position - 1) == i) return letters[i];
  }
}
console.log(returnLetter(7));





//Функция която връща число, ако то се среща повече от 50% сред останалите числа от масива
function foundNumber(numbers){
  let value = "Числото което се среща над 50% сред останалите е числото --> ";
  let repeatingNumber = {};

  for(let i = 0; i < numbers.length; i ++){
    if(!repeatingNumber[numbers[i]]) repeatingNumber[numbers[i]] = 0;
    repeatingNumber[numbers[i]]++;     
    if((numbers.length / 2) < repeatingNumber[numbers[i]]) return value += Object.keys(repeatingNumber).reduce(function(a, b){ return repeatingNumber[a] > repeatingNumber[b] ? a : b });
  }
  
  return value;
}
console.log(foundNumber([4, 5, 8, 5, 5, 3, 6, 5, 1, 5, 7, 5, 5, 4, 5]));





//Функция която слива няколко масива в един
let array = [1, 2, [], "hi", 5, [6], ["bye"], [], [[["vidin"]]], [[[]]]];

function func(array){
  for(let i = 0; i < array.length; i ++){      
    array = [].concat.apply([], array);      
  }  
  return array;
}
console.log(func(array));





 //функция която връща пройзволен низ от числа
 function randomNumber(lengthNumber){ 

  let number = "";
  let string = "0123456789";

  for(let i = 0; i < lengthNumber; i ++){
    number += string.charAt(Math.random() * string.length);
  }

  return number;
}
console.log(randomNumber(8));





//Функция която връща всички възможни комбинации от подадените числа
function numericalCombination(numbers){

  let allCombinations = "", combination = "", number = "", myNumbers = "", result = [], count = 1;

  myNumbers = numbers.toString().replace(/[","]/g, "");

  for(let i = 0; i < numbers.length; i ++){
    count *= numbers.length
  }

  do {
    number += myNumbers.charAt(Math.random() * myNumbers.length);

    if(combination.length < numbers.length){
      combination += number, number = number.replace(number, ""); 
    }     
    else if(combination.length == numbers.length && result.indexOf(combination) == - 1) {
      result.push(combination), combination = combination.replace(combination, "");
    }       
    else {
      combination = combination.replace(combination, "");
    }      

  } while(result.length < count)
 
  allCombinations += result;

  return allCombinations;
}
console.log(numericalCombination([1, 2, 3]));





//Функция която връща число което не се повтаря, ако има такова
function repeatingNumber(numbers){
  let message = "All numbers are repeated", repeatingNumbers = [], number = "";

  repeatingNumbers = numbers.filter(function(element) {
    return numbers.lastIndexOf(element) == numbers.indexOf(element);
  });

  if(numbers.length && !repeatingNumbers.length) return message;
  else number += "The number " + repeatingNumbers + " is unique";   
  
  return number;
}
console.log(repeatingNumber([5, 2, 5, 2, 8, 3, 12, 9, 8, 9, 3]));





//Функция която връща липсващото число от поредица последователни числа
function knowTheNumber(numbers){
   
  for(let i = 0; i < numbers.length - 1; i ++){

    if(numbers.indexOf(numbers[i] + 1) == -1){
      return numbers[i] + 1;
    }    
  }  
  return "No missing number";
}
console.log(knowTheNumber([100, 101, 103, 104]));





//Функция която връща изречение, ако изречението съдържа и двете думи който са подадени
function returnWords(text, word1, word2){
  let sentence = "", message = "no result";

  for(let i = 0; i < text.length; i ++){
    sentence += text[i];

      if(text[i] == "." || text[i] == "," || i == text.length - 1){

        for(let y = 0; y < sentence.length; y ++){
          if(sentence.includes(word1) && sentence.includes(word2)) return sentence;
          else sentence = "";
        }
      }
  }
  return message;
}
console.log(returnWords("Imalo edno vreme edna hubava bira koqto se kazvala ariana. vladi mnogo obicha da pie ariana", "ariana", "vladi"));





//Функция която приема един паръметър(string) и връща резултат... string палидром ли е или не е
function palindrome(string){  
  let reversedWord = "";

  string = string.replace(/ /g, "");

  for(let i = string.length - 1; i >= 0; i --){  
    reversedWord += string[i];
  }

  if(reversedWord == string) return "string is a palindrome";
  return "string is not a palindrome";
}
console.log(palindrome("бял хляб"));





//Функция която приема число от 0 до 1000 и връща числото с думи
function returnNumberInWords(number) {
  let convertNumber = number.toString(), result = "", comma = ",", space = " ", and = "и";

  let oneDigitNumbers = { 0: "нула", 1: "едно", 2: "две", 3: "три", 4: "четири", 5: "пет", 6: "шест", 7: "седем", 8: "осем", 9: "девет" };   
  let twoDigitNumbers = { 10: "десет", 11: "единадесет", 12: "дванадесет", 13: "тринадесет", 14: "четиринадесет", 15: "петнадесет", 16: "шестнадесет", 17: "седемнадесет", 18: "осемнадесет", 19: "деветнадесет" };  
  let firstDigit = { 1: "десет", 2: "двадесет", 3: "тридесет", 4: "четиридесет", 5: "петдесет", 6: "шестдесет", 7: "седемдесет", 8: "осемдесет", 9: "деветдесет"}; 
  let threeDigitNumbers = { 1: "сто", 2: "двеста", 3: "триста", 4: "четиристотин", 5: "петстотин", 6: "шестстотин", 7: "седемстотин", 8: "осемстотин", 9: "деветстотин" };
  let circularTwoDigitNumbers = { 10: "десет", 20: "двадесет", 30: "тридесет", 40: "четиридесет", 50: "петдесет", 60: "шестдесет", 70: "седемдесет", 80: "осемдесет", 90: "деветдесет" };
  let circularThreeDigitNumbers = {  100: "сто", 200: "двеста", 300: "триста", 400: "четиристотин", 500: "петстотин", 600: "шестстотин", 700: "седемстотин", 800: "осемстотин", 900: "деветстотин" };
  let thousand = "хиляда";

  if(number < 10){
      for(let i in oneDigitNumbers){
          if(convertNumber == i){
              result += oneDigitNumbers[i];
          }           
      }
  }

  else if(number > 9 && number < 20){
      for(let i in twoDigitNumbers){
          if(convertNumber == i){
              result += twoDigitNumbers[i];
          }           
      }
  }

  else if(number > 19 && number < 100 && convertNumber.charAt(2) == 0){
      if(convertNumber.charAt(1) == 0){
          for(let i in circularTwoDigitNumbers){
              if(convertNumber == i){
                  result += circularTwoDigitNumbers[i];
              }           
          }
      }
      else {
          for(let i in firstDigit){
              if(convertNumber.charAt(0) == i){
                  result += firstDigit[i];
              }           
          }
          for(let i in oneDigitNumbers){
              if(convertNumber.charAt(1) == i){
                  result += space + and + space + oneDigitNumbers[i];
              }           
          }
      }
  }

  else if(number > 99 && number < 1000){
      if(convertNumber.charAt(1) == 0 && convertNumber.charAt(2) == 0){
          for(let i in circularThreeDigitNumbers){
              if(convertNumber == i){
                  result += circularThreeDigitNumbers[i];
              }           
          }
      }  
      else if(convertNumber.charAt(1) == 0){
          for(let i in threeDigitNumbers){
              if(convertNumber.charAt(0) == i){
                  result += threeDigitNumbers[i];
              }           
          }

          for(let i in oneDigitNumbers){
              if(convertNumber.charAt(2) == i){
                  result += space + and + space + oneDigitNumbers[i];
              }           
          }
      }
      else if(convertNumber.charAt(1) != 0 && convertNumber.charAt(2) == 0){
          for(let i in threeDigitNumbers){
              if(convertNumber.charAt(0) == i){
                  result += threeDigitNumbers[i];
              }           
          }

          for(let i in firstDigit){
              if(convertNumber.charAt(1) == i){
                  result += space + and + space + firstDigit[i];
              }           
          }
      }
      else {
          if(convertNumber.charAt(1) == 1){
             
              for(let i in threeDigitNumbers){
                  if(convertNumber.charAt(0) == i){
                      result += threeDigitNumbers[i] + space;
                  }           
              }

              convertNumber = convertNumber.charAt(1) + convertNumber.charAt(2);

              for(let i in twoDigitNumbers){
                  if(convertNumber == i){
                      result += and + space + twoDigitNumbers[i];
                  }
              }
          }
          else {
              for(let i in threeDigitNumbers){
                  if(convertNumber.charAt(0) == i){
                      result += threeDigitNumbers[i] + comma + space;
                  }           
              }

              for(let i in firstDigit){
                  if(convertNumber.charAt(1) == i){
                      result += firstDigit[i];
                  }           
              }

              for(let i in oneDigitNumbers){
                  if(convertNumber.charAt(2) == i){
                      result += space + and + space + oneDigitNumbers[i];
                  }           
              }
          }       
      }
  }
  else if(number == 1000) return result += thousand;

  return result;
}
console.log(returnNumberInWords(5));





//Функция която обработва даден масив от числа по определен начин
function arrayProcessing(arrayOfNumbers){
    
  let numbers = arrayOfNumbers;

  for(let i = 0; i < numbers.length; i ++){
    if(numbers[i] % 2 == 1) numbers[i] = 2;
    else if(numbers[i] % 2 == 0 && numbers[i] != 0) numbers[i] += 3;
    else if(numbers[i] == 0) numbers[i] = i;
  }
  return numbers;
}
console.log(arrayProcessing([2, 3, 2, 0, 8, 0, 2, 12, 4, 1, 7, 9, 10, 15, 2, 0]));





// //Функция която връща всички възможни комбинации от подадените числа
function numericalCombination(numbers){

  let allCombination = [], combination = [], result;

  for (let i = 0; i < numbers.length; i ++) {
  
    let permutations = numericalCombination(numbers.slice(0, i).concat(numbers.slice(i + 1)));
      
    if(!permutations.length){
      combination.push(numbers[i]);          
    } else {
      for(let y = 0; y < permutations.length; y ++) {
        combination.push([numbers[i]].concat(permutations[y]));
      }
    } 
  }             

  for(let i = 0; i < combination.length; i ++){ 
    result = combination[i].toString().replace(/,/g, ''), allCombination.push(result);      
  }
  return allCombination;
}
console.log(numericalCombination([1, 2, 3]).join());





//Функция която връща camelCase (кратък вариант)
function camelCase(words){

  let result = "", firstLetter, anotherLetters, firstWord;  
  let allWords = words.match(/\w+/g);

  for(let i = 0; i < allWords.length; i ++){
    if(!result.length) firstWord = allWords[0].toString(), word = firstWord.toLowerCase(), result += word;
    if(allWords[i] != allWords[0]){
      allWords[i].toString(), word = allWords[i].toLowerCase(), firstLetter = word.substr(0, 1).toUpperCase(),
      anotherLetters = word.substr(1, word.length), word = firstLetter + anotherLetters;
      result += word;
    }
  }
  return result;
}
console.log(camelCase("viDIN soFIq montANA"));





//Функция която връща camelCase (кратък вариант)
function camelCase(string){
  let words, result;

  words = string.toLowerCase().replace(/^|\s(.)/g, firstLetter => firstLetter.toUpperCase());
  result = words.replace(/\s/g, '');
  
  return result;
}
console.log(camelCase("viDIN soFIq mOntANA"));





//Функция която приема два параметъра (текст и дължина) и връща част от текста колкото подадената дължина.
let text = "Земята е третата планета в Слънчевата система.";

function func2(text, length){
  return text.substr(0, length);
}
console.log(func2(text, 16));





//Функция която сравнява два масива дали са с еднакви стойности
function func5(firstArray, secondArray){

  if(firstArray.length != secondArray.length) return false;

  for(let i = 0; i < firstArray.length; i ++){
    if(firstArray[i] != secondArray[i]) return false;
  }
  return true;
}
console.log(func5([1, "vidin", 4], [1, "vidin", 4, 5]));





//Функция която приема един параметър (текст) и заменя главните букви с малки... а малките с главни.
function func1(text){
  let changedText = "";
  for(let i = 0; i < text.length; i ++){
    if(text[i] == text[i].toLowerCase()) changedText += text[i].toUpperCase();
    else changedText += text[i].toLowerCase();
  }
  return changedText;
}
console.log(func1("Hello How Are You"));





//Функция която взима средната стойност на числата от масива
function func2(array) {
  let result = 0;
  for(let key of array){
    result += key;
  }
  return result / array.length;
}
console.log(func2([1, 2, 3, 4]))





