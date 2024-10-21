export function getErrorMessage(error: any){
  return error?.response?.data?.message || error?.response?.data?.error || 'Algo não funcionou bem'
}