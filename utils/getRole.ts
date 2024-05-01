export default function getRole(groupNum){
    const roles = {
      1: "Admin",
      2: "Manager",
      3: "Coordinator",
      4: "Artisan",
      5: "Others"
    };
  
    return roles[groupNum] || "";
  };
  