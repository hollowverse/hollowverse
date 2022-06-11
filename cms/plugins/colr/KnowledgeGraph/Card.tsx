import React from 'react';

export function Card(props: any) {
  return (
    <div className="mt-5 p-3 bg-white rounded-xl">
      <div className="flex w-full">
        <img
          src={props?.image?.contentUrl}
          width={150}
          className="rounded-lg"
        />
        <div className="ml-2">
          <div className="p-3">
            <h3 className="text-2xl">{props.name}</h3>
            <span>{props.description}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
            <div className="mr-3">
              <span className="text-gray-400 block">Knowledge Graph ID</span>
              <input
                readOnly
                value={props['@id']}
                className="font-bold text-black text-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
