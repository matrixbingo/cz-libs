import React from 'react';
import G6 from '@antv/g6';
import {Group, Rect, Text, Image, Polygon, createNodeFromReact } from '@antv/g6-react-node';

const FlowNode = ({ cfg }) => {
  window.console.log('cfg---------------->', cfg);
  const { description, meta = {}, label = 'label' } = cfg;

  return (
    <Group>
    <Rect style={{
          radius: [6, 6, 6, 6],
          stroke: '#91d5ff',
        }}  onClick={(e) => window.console.log('e ---------------->', e)}>
      <Rect
        style={{
          width: 150,
          height: 20,
          fill:'#91d5ff',
          radius: [6, 6, 0, 0],
          cursor: 'move',
          stroke: '#91d5ff',
        // justyfyContent: 'center',
          justifyContent:'center'
        }}
        draggable={true}
      >
        <Text
          style={{
            margin: [4, 5],
            fontWeight: 'bold',
            fill: '#fff',
          }}
        >
          {label}
        </Text>
      </Rect>
      <Rect
        style={{
          width: 150,
          height: 50,
          stroke: cfg.color,
          fill: '#ffffff',
          radius: [0, 0, 6, 6],
        }}
        onClick={(e) => window.console.log('e ---------------->', e)}
      >
        <Text style={{ marginTop: 5, fill: '#333', margin: [8, 4] }} onClick={(e) => window.console.log('e 描述 ---------------->', e)}>
          描述: {description}
        </Text>
        <Text style={{ marginTop: 10, fill: '#333', margin: [6, 4] }}>
          创建者: {meta.creatorName}
        </Text>
      </Rect>
    </Rect>
  </Group>
  )
}

export default FlowNode;
