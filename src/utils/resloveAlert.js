import swal from 'sweetalert'

export function resolveAlert (resolve) {
  const tip = resolve.data.tip
  const message = resolve.data.message
  if (tip === 'success') {
    swal("成功", message, "success")
  } else {
    swal("失敗", message, "error")
  }
}