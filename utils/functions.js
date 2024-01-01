
export const getPropType = val => {
    switch (val) {
      case "3":
        return "شقة";
      case "4":
        return "فيلا";
      case "5":
        return "أرض";
      case "6":
        return "عمارة";
      case "7":
        return "محل تجاري";
      case "8":
        return "مول";
      case "9":
        return "شاليه";
      case "10":
        return "إستراحة";
      case "11":
        return "مستودع";
      case "12":
        return "مصنع";
      default:
        return "أخرى";
    }
  };


  export const getAdvType = val => {
    switch (val) {
      case "for_sale":
        return "للبيع";
      case "for_rent":
        return "للإيجار";
      case "for_invest":
        return "للإستثمار";
      default:
        return "للبيع";
    }
   };

   //export const defaultImageSource = require('./path/to/default-image.png');


    export const getPropStatus = val => {
      switch (val) {
        case "draft":
          return {
            color:"#ff0000",
            text :"مسودة"
          };
  
        case "pending":
          return {
            color:"#ecc100",
            text :"قيد الإنتظار"
          };
    
        case "active":
          return {
            color: "#008036",
            text :"نشط"
          };
  
        default:
          return {
            color:"#fe7e25",
            text :"غير معروف"
          };
      }
    };


   export  function toEnglishNumber(strNum) {
      const arabicNumbers = "٠١٢٣٤٥٦٧٨٩".split("");
      const englishNumbers = "0123456789".split("");
      strNum = strNum.replace(
        /[٠١٢٣٤٥٦٧٨٩]/g,
        x => englishNumbers[arabicNumbers.indexOf(x)]
      );
      strNum = strNum.replace(/[^\d]/g, "");
      return strNum;
    }