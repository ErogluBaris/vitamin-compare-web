// src/components/Spinner.tsx
import { useLoading } from '../context/LoadingContext'
import { CircularProgress, Backdrop } from '@mui/material'

const Spinner = () => {
  const { loading } = useLoading()

  return (
    <Backdrop open={loading} style={{ zIndex: 9999 }}>
      <CircularProgress sx= {{color: '#FF9800'}} />
    </Backdrop>
  )
}

export default Spinner