function binarySearch(data, targetEmail) {
   let left = 0;
   let right = data.length - 1;

   while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const currentEmail = data[mid].email;

      if (currentEmail === targetEmail) {
         return [data[mid]]; // Returns an array containing the found object
      } else if (currentEmail < targetEmail) {
         left = mid + 1;
      } else {
         right = mid - 1;
      }
   }

   return []; // Returns an empty array if the email is not found
}

export default binarySearch;
