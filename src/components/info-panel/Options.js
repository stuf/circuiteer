import { ShowInfo } from 'components/ui';

const optionFlags = [
  {
    label: 'locationEfficiency',
    key: 'locationEfficiency',
  },
  {
    label: 'powerBreakdown',
    key: 'powerBreakdown',
  },
  {
    label: 'stateDebug',
    key: 'stateDebug',
  },
];

export function Options(props) {
  return (
    <ShowInfo label="options" narrow>
      <ul className="space-y mt-03">
        <li>kakn</li>
        <li>kakn</li>
      </ul>
    </ShowInfo>
  );
}
