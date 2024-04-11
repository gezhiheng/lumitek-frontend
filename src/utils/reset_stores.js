import { useFormTableStore } from '@/stores/mfb01/form_table_store'
import { useFormTabStore } from '@/stores/mfa01/form_tab_store'

const resetStores = (path) => {
  const storeReset = [
    {
      path: '/mfb01',
      reset: () => {
        const { resetFormTable } = useFormTableStore()
        resetFormTable()
      },
    },
    {
      path: '/mfa01',
      reset: () => {
        const { resetFormTab } = useFormTabStore()
        resetFormTab()
      },
    },
  ]
  storeReset.forEach((item) => {
    if (item.path === path) {
      item.reset()
      return
    }
  })
}

export default resetStores
