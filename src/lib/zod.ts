import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (ctx.defaultError === "Required") {
    return { message: `Preenchimento obrigatório` };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export { z };
