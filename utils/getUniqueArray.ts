export default function getUniqueArray(arr, prop) {
    const seen = new Set();
  
    return arr.filter((obj) => {
      const value = obj[prop];
      if (!seen.has(value)) {
        seen.add(value);
        return true;
      }
      return false;
    });
  }
  