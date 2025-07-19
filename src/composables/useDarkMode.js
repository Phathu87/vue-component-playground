import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'body',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)

export { isDark, toggleDark }

