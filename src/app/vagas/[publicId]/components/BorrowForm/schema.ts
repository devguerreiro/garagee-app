import { z } from "@/lib/zod";

import dayjs from "@/lib/dayjs";

const formSchema = z
  .object({
    from_date: z.date(),
    from_hour: z.coerce.number().min(0).max(23),
    to_date: z.date(),
    to_hour: z.coerce.number().min(0).max(23),
  })
  .superRefine((val, ctx) => {
    const now = dayjs();
    const fromDateTime = dayjs(val.from_date).set("hour", val.from_hour);
    const toDateTime = dayjs(val.to_date).set("hour", val.to_hour);

    if (fromDateTime.isBefore(now, "date")) {
      ctx.addIssue({
        code: "invalid_date",
        path: ["from_date"],
        message: "A data de início não pode ser no passado",
      });
    }

    if (fromDateTime.isBefore(now, "minute")) {
      ctx.addIssue({
        code: "invalid_date",
        path: ["from_hour"],
        message: "A hora de início não pode ser no passado",
      });
    }

    if (toDateTime.isBefore(fromDateTime, "date")) {
      ctx.addIssue({
        code: "invalid_date",
        path: ["to_date"],
        message: "A data de fim não pode anteceder a data de início",
      });
    }

    if (
      toDateTime.isSame(fromDateTime, "date") &&
      toDateTime.isBefore(fromDateTime, "hour")
    ) {
      ctx.addIssue({
        code: "invalid_date",
        path: ["to_hour"],
        message: "A hora de fim não pode anteceder a hora de início",
      });
    }

    if (toDateTime.isSame(fromDateTime, "hour")) {
      ctx.addIssue({
        code: "invalid_date",
        path: ["to_hour"],
        message: "A hora de fim não pode ser igual à hora de início",
      });
    }
  });

type FormSchema = z.infer<typeof formSchema>;

export default formSchema;
export type { FormSchema };
