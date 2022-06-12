import React from 'react';
import { BsGrid1X2 } from 'react-icons/bs';
import { AiOutlineNodeIndex } from 'react-icons/ai';
import { useState } from 'react';
import { KnowledgeGraph } from './KnowledgeGraph';

import './output.css?raw';

function Colr() {
  const [selectedPage] = useState('KnowledgeGraph');

  return (
    <>
      {/* component */}
      <div className="w-full h-full">
        <div className="flex flex-no-wrap h-full">
          <div
            style={{ minHeight: 716 }}
            className="w-3/12 absolute sm:relative bg-[#101112] shadow md:h-full flex-col justify-between sm:flex"
          >
            <div className="px-8">
              <ul className="mt-12">
                <li className="flex w-full justify-between text-gray-300 cursor-pointer items-center mb-6">
                  <a className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                    <AiOutlineNodeIndex />
                    <span className="text-sm ml-2">Knowledge Graph Search</span>
                  </a>
                  {/* <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">
                    5
                  </div> */}
                </li>
              </ul>
            </div>
          </div>

          <div className="container mx-auto py-10 h-64 px-6">
            <div className="w-full h-full">
              {selectedPage === 'KnowledgeGraph' && <KnowledgeGraph />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default {
  title: 'Colr',
  name: 'colr',
  icon: BsGrid1X2,
  component: Colr,
};
