import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (ctx.defaultError === "Required") {
    return { message: `Preenchimento obrigatório` };
  } else if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === z.ZodParsedType.string) {
      const message = `Requer pelo menos ${issue.minimum} caractere`;
      return { message: issue.minimum > 1 ? message + "s" : message };
    }
  } else if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === z.ZodParsedType.string) {
      const message = `Ultrapassou o limite de ${issue.maximum} caractere`;
      return { message: issue.maximum > 1 ? message + "s" : message };
    }
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export { z };
