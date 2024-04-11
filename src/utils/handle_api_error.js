import swal from 'sweetalert'

/**
 * 处理API错误并显示错误提示。
 * @param {string} source - 出错的源标识
 * @param {object} error - 包含API错误信息的对象
 */
export function handleApiError(source, error) {
  console.log(`❌ ~ ${source} ~ error:`, error)
  if (error?.response) {
    swal('錯誤', error.response.data.message, 'error')
  }
}
