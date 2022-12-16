import {
  errorSchema,
  resultSchema,
  loginParamsSchema
} from "./schemas/"

export default {
  loginParams: loginParamsSchema,
  error: errorSchema,
  result: resultSchema
}
