export const getDate = (date = new Date()): string => {
    try {
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const min = String(date.getMinutes() + 1).padStart(2, "0");
      const hh = String(date.getHours()).padStart(2, "0");
      const yyyy = date.getFullYear();
      return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
    } catch (error) {
      console.log("Get date ERROR", error);
      return "";
    }
  };