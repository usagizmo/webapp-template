import { ForwardRefExoticComponent, VFC } from 'react'
import { IconProps, IconWeight } from 'phosphor-react'
import classnames from 'classnames'

type IconSize = 24 | 20 | 12 | [40, 24] | [24, 16] | [20, 16] | [24, 12] | [20, 12] | [16, 12]

interface Props {
  Icon: ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
  size: IconSize
  className?: string
  weight?: IconWeight
}

const IconFrame: VFC<Props> = ({ Icon, size, className, weight }) => {
  const _size = typeof size === 'number' ? [size, size] : size

  return (
    <i
      className={classnames('u-flex-center', className, {
        'w-[40px] h-[40px]': _size[0] === 40,
        'w-[24px] h-[24px]': _size[0] === 24,
        'w-[20px] h-[20px]': _size[0] === 20,
        'w-[16px] h-[16px]': _size[0] === 16,
        'w-[12px] h-[12px]': _size[0] === 12,
      })}
    >
      <Icon width={_size[1]} height={_size[1]} weight={weight ?? 'light'} />
    </i>
  )
}

export default IconFrame
