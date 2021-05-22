import { useSelector } from 'react-redux';

import { Button } from 'components';

export function Toolbar() {
  const state = useSelector(a => a);

  return (
    <>
      <div className="flex space-x-1 pl-1 border-l-2">
        <div>
          <Button label="Import" icon="file_upload" />
        </div>
        <div className="relative">
          <Button label="Export" icon="file_download" />
          <div className="absolute left-0 top-full z-10">
            <div
              style={{ width: '40rem', height: '30rem' }}
              className="bg-white border-2 shadow-lg rounded-lg px-4 py-2 flex flex-col"
            >
              <header className="font-bold mb-2">Export</header>

              <div className="flex-grow relative">
                <div className="absolute top-2 right-4">
                  <Button label="Copy" icon="content_copy" />
                </div>

                <textarea
                  className={`
                    border-2 border-pink-500
                    p-2 w-full h-full
                    font-mono text-xs
                    ring-2 ring-purple-500
                    ring-offset-2 ring-offset-white
                    rounded
                  `}
                  value={JSON.stringify(state, null, 2)}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
