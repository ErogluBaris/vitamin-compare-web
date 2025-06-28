let setter: (val: boolean) => void = () => {}

export const registerGlobalLoadingSetter = (setFn: (val: boolean) => void) => {
  setter = setFn
}

export const setGlobalLoading = (val: boolean) => {
  setter(val)
}
