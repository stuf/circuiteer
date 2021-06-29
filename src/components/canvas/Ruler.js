import clsx from 'clsx';

export function Ruler(props) {
  const { magnitude, dimension, className } = props;

  const svgProps = {
    width: dimension === 'width' ? magnitude : 0,
    height: 20,
  };

  const {
    left: ml,
    top: mt,
    right: mr,
    bottom: mb,
  } = { left: 0, top: 5, right: 0, bottom: 0 };

  const rule = {
    height: svgProps.height - mt - mb,
    width: svgProps.width - ml - mr,
  };

  return (
    <div className={clsx('absolute', 'ruler', className)}>
      <svg {...svgProps}>
        <path
          fill="none"
          stroke="#fff"
          d={[
            `M 0 ${mt}`,
            `V ${rule.height}`,
            `H ${rule.width}`,
            `V ${mt}`,
          ].join(' ')}
        />
        {/* <path
          fill="none"
          stroke="#fff"
          d={[
            'M 0 0',
            'v 15',
            'm 0 -7.5',
            `h ${svgProps.width}`,
            `M ${svgProps.width} 0`,
            'v 15',
          ].join(' ')}
        /> */}
        <text
          x={svgProps.width / 2}
          y={svgProps.height / 2}
          fill="#fff"
          className="font-01 font-narrow font-italic"
        >
          <tspan alignmentBaseline="center" textAnchor="middle">
            {magnitude}
          </tspan>
        </text>
      </svg>
    </div>
  );
}
