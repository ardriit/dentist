import { Loader } from '@mantine/core'

export function MyLoader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Loader />
    </div>
  )
}
