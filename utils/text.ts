export function getErrorMessage(error: any){
  return error?.response?.data?.message || 'Algo não funcionou bem'
}