import dayjs from "dayjs";

import localizedFormat from "dayjs/plugin/localizedFormat";

import ptBR from "dayjs/locale/pt-br";

dayjs.extend(localizedFormat);

dayjs.locale(ptBR);

export default dayjs;
