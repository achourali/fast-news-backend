import { ValidationOptions, Matches } from "class-validator";

export function IsNotBlank(validationOptions?: ValidationOptions) {
  return Matches(/^(?!\s*$).+/,{...{message : "Empty Strings are not allowed"},...validationOptions});
}
