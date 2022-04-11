import React, { useState } from 'react';
import { Flow } from 'aem-ui-graph';


const Demo: React.FC = () => {
  const [value, setValue] = useState('')

  // const onChange = () => {

  // }

  return (
    <>
      <Flow />
    </>
  );
};

export default Demo;

// import React from 'react';
// import { Avatar } from '@cz160/components';
// export default () => {
//   return (
//     <>
//       <div>
//         <Avatar size={64} />
//         <Avatar size="large" />
//         <Avatar />
//         <Avatar size="small" />
//       </div>
//       <br />
//       <br />
//       <div>
//         <Avatar shape="square" size={64} />
//         <Avatar shape="square" size="large" />
//         <Avatar shape="square" />
//         <Avatar shape="square" size="small" />
//       </div>
//       <br />
//       <br />
//       <div>
//         <Avatar>U</Avatar>
//         <Avatar size={40}>USER</Avatar>
//         <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//         <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
//           U
//         </Avatar>
//         <Avatar style={{ backgroundColor: '#87d068' }} />
//       </div>
//     </>
//   );
// };
