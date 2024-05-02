import { isProduction } from "./env";

export const endpoints=
{
	baseUrl:isProduction?'https://api.cateringsandtiffins.in/':null,
}
