const requireFieldValidator = (object: any, fields: any) => {
  fields.map((field: any) => {
    if (typeof object[field] === "string" && object[field].trim() === "") {
      throw `${field} is not allowed to be empty`;
    } else if (typeof object[field] === "object") {
      Object.entries(object[field]).map((entry: any) => {
        if (entry[1].trim() === "") {
          throw `${entry[0]} is not allowed to be empty`;
        }
      });
    }
  });
};

export default requireFieldValidator;
