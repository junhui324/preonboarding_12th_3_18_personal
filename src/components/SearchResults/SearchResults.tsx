// import React, { useRef } from 'react';

// export default function SearchResults({
//   results,
//   focusedIndex,
//   onResultKeyDown,
//   resultRefs,
// }) {
//   return (
//     <div>
//       {results.map((result, index) => (
//         <div
//           key={index}
//           className={`result-item ${focusedIndex === index ? 'focused-item' : ''}`}
//           tabIndex={0}
//           onKeyDown={(e) => onResultKeyDown(e, index)}
//           ref={(ref) => (resultRefs.current[index] = ref)}
//         >
//           {result}
//         </div>
//       ))}
//     </div>
//   );
// }
export {};
