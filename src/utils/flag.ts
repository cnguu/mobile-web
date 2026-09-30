import { createEnum } from '@/utils/enum'

export const FlagStringEnum = createEnum({
  FALSE: {
    label: 'common.no',
    value: '0',
  },
  TRUE: {
    label: 'common.yes',
    value: '1',
  },
})

export const FlagNumberEnum = createEnum({
  FALSE: {
    label: 'common.no',
    value: 0,
  },
  TRUE: {
    label: 'common.yes',
    value: 1,
  },
})

export const FlagBooleanEnum = createEnum({
  FALSE: {
    label: 'common.no',
    value: false,
  },
  TRUE: {
    label: 'common.yes',
    value: true,
  },
})
