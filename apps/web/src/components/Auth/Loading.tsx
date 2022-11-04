/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Loader } from '@mantine/core'

import { AlignCenter } from '@web/utils/styles'

export const Loading = () => (
  <AlignCenter>
    <Loader size="xl" variant="dots" />
  </AlignCenter>
)
