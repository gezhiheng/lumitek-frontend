import swal from 'sweetalert'

function ral(resolve) {
  const isSuccess = resolve?.tip === 'success'
  swal(isSuccess ? '成功' : '錯誤', resolve?.message, isSuccess ? 'success' : 'error')
  return isSuccess
}

export default ral