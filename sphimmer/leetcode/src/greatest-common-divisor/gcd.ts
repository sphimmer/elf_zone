export function gcdOfStrings(str1: string, str2: string): string {
  let divisor = '';
  for (let c = 1; c < str1.length; c++) {
    
    const slice = str1.slice(0,c+1);
    const test1 = str1.split(slice).join('');
    const test2 = str2.split(slice).join('');
    if (test1 == '' && test2 == '') {
      divisor = slice
    }
  }
    return divisor;
};

// function gcd(a: number, b: number): number {
//   if (b === 0) return a;
//   return gcd(b, a % b);
// }

// export function gcdOfStrings(str1: string, str2: string): string {
//   // If concatenation in both orders is not the same, there is no common divisor
//   if (str1 + str2 !== str2 + str1) {
//     return '';
//   }

//   // Find the GCD of the lengths of the two strings
//   const gcdLength = gcd(str1.length, str2.length);

//   // Return the substring of str1 from 0 to gcdLength
//   return str1.slice(0, gcdLength);
// }