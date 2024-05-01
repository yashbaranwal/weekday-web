export default function getTrimmedString(string, limit) {
    if (string.length < limit) return string;
    return string.substr(0, limit) + "...";
  }
  