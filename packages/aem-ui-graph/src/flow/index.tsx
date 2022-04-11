import React from 'react';
import G6 from '@antv/g6';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Rect, Text, Image, Polygon, createNodeFromReact } from '@antv/g6-react-node';
import FlowNode from './flow-node';

const data = {
  id: 'root',
  label: 'root',
  children: [
    {
      id: 'c1',
      label: 'c1',
      children: [
        {
          id: 'c1-1',
          label: 'c1-1',
        },
        {
          id: 'c1-2',
          label: 'c1-2',
          children: [
            {
              id: 'c1-2-1',
              label: 'c1-2-1',
            },
            {
              id: 'c1-2-2',
              label: 'c1-2-2',
            },
          ],
        },
      ],
    },
    {
      id: 'c2',
      label: 'c2',
    },
    {
      id: 'c3',
      label: 'c3',
      children: [
        {
          id: 'c3-1',
          label: 'c3-1',
        },
        {
          id: 'c3-2',
          label: 'c3-2',
          children: [
            {
              id: 'c3-2-1',
              label: 'c3-2-1',
            },
            {
              id: 'c3-2-2',
              label: 'c3-2-2',
            },
            {
              id: 'c3-2-3',
              label: 'c3-2-3',
            },
          ],
        },
        {
          id: 'c3-3',
          label: 'c3-3',
        },
      ],
    },
  ],
};

// G6.Util.traverseTree(data, (d) => {
//   d.leftIcon = {
//     style: {
//       fill: '#e6fffb',
//       stroke: '#e6fffb',
//     },
//     img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ',
//   };
//   return true;
// });


G6.registerNode('icon-node', createNodeFromReact(FlowNode))

G6.registerNode(
  'icon-node-222',
  (cfg) => `
    <group>
      <rect>
        <rect style={{
          width: 150,
          height: 20,
          fill: ${cfg.color},
          radius: [6, 6, 0, 0],
          cursor: 'move'，
          stroke: ${cfg.color}
        }} draggable="true">
          <text style={{
            marginTop: 2,
            marginLeft: 75,
            textAlign: 'center',
            fontWeight: 'bold',
            fill: '#fff' }}>{{label}}</text>
        </rect>
        <rect style={{
          width: 150,
          height: 55,
          stroke: ${cfg.color},
          fill: #ffffff,
          radius: [0, 0, 6, 6],
        }}>
          <text style={{ marginTop: 5, marginLeft: 3, fill: '#333', marginLeft: 4 }}>描述: {{description}}</text>
          <text style={{ marginTop: 10, marginLeft: 3, fill: '#333', marginLeft: 4 }}>创建者: {{meta.creatorName}}</text>
        </rect>
      </rect>
    </group>`,
);

G6.registerNode(
  'icon-node222',
  {
    options: {
      size: [60, 20],
      stroke: '#91d5ff',
      fill: '#91d5ff',
    },
    draw(cfg, group) {
      const styles = this.getShapeStyle(cfg);
      const { labelCfg = {} } = cfg;

      const w = styles.width;
      const h = styles.height;
      // console.log('styles : ====> ', styles);
      const keyShape = group.addShape('rect', {
        attrs: {
          ...styles,
          x: -w / 2,
          y: -h / 2,
        },
      });

      /**
       * leftIcon 格式如下：
       *  {
       *    style: ShapeStyle;
       *    img: ''
       *  }
       */
      console.log('cfg.leftIcon', cfg.leftIcon);
      if (cfg.leftIcon) {
        const { style, img } = cfg.leftIcon as any;
        group.addShape('rect', {
          attrs: {
            x: 1 - w / 2,
            y: 1 - h / 2,
            width: 38,
            height: styles.height - 2,
            fill: '#8c8c8c',
            ...style,
          },
        });
      }

      if (cfg.label) {
        group.addShape('text', {
          attrs: {
            ...labelCfg.style,
            text: cfg.label,
            x: 50 - w / 2,
            y: 25 - h / 2,
          },
        });
      }

      return keyShape;
    },
    update: undefined,
  },
  'rect',
);

G6.registerEdge('flow-line', {
  draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const { style } = cfg;
    const shape = group.addShape('path', {
      attrs: {
        stroke: style.stroke,
        endArrow: style.endArrow,
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
          ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
          ['L', endPoint.x, endPoint.y],
        ],
      },
    });

    return shape;
  },
});

const defaultStateStyles = {
  hover: {
    stroke: '#1890ff',
    lineWidth: 2,
  },
};

const defaultNodeStyle = {
  fill: '#91d5ff',
  stroke: '#40a9ff',
  radius: 5,
};

const defaultEdgeStyle = {
  stroke: '#91d5ff',
  endArrow: {
    path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
    fill: '#91d5ff',
    d: -20,
  },
};

const defaultLayout = {
  type: 'compactBox',
  direction: 'TB',
  getId: function getId(d) {
    return d.id;
  },
  getHeight: function getHeight() {
    return 16;
  },
  getWidth: function getWidth() {
    return 16;
  },
  getVGap: function getVGap() {
    return 80;
  },
  getHGap: function getHGap() {
    return 170;
  },
};

const defaultLabelCfg = {
  style: {
    fill: '#000',
    fontSize: 12,
  },
};


const initGraph = () => {
  const container = document.getElementById('container');
  const width = container.scrollWidth;
  const height = container.scrollHeight || 500;

  const minimap = new G6.Minimap({
    size: [150, 100],
  });
  const graph = new G6.TreeGraph({
    container: 'container',
    width,
    height,
    linkCenter: true,
    plugins: [minimap],
    modes: {
      default: ['drag-canvas', 'zoom-canvas'],
    },
    defaultNode: {
      type: 'icon-node',
      size: [120, 40],
      style: defaultNodeStyle,
      labelCfg: defaultLabelCfg,
    },
    defaultEdge: {
      type: 'flow-line',
      style: defaultEdgeStyle,
    },
    nodeStateStyles: defaultStateStyles,
    edgeStateStyles: defaultStateStyles,
    layout: defaultLayout,
  });

  graph.data(data);
  graph.render();
  graph.fitView();

  graph.on('node:mouseenter', (evt) => {
    const { item } = evt;
    graph.setItemState(item, 'hover', true);
  });

  graph.on('node:mouseleave', (evt) => {
    const { item } = evt;
    graph.setItemState(item, 'hover', false);
  });

  graph.on('node:click', (evt) => {
    window.console.log('evt---------------->', evt);
    const { item, target } = evt;
    const targetType = target.get('type');
    const name = target.get('name');

    // 增加元素
    if (targetType === 'marker') {
      const model = item.getModel() as any;
      if (name === 'add-item') {
        if (!model.children) {
          model.children = [];
        }
        const id = `n-${Math.random()}`;
        model.children.push({
          id,
          label: id.substr(0, 8),
          leftIcon: {
            style: {
              fill: '#e6fffb',
              stroke: '#e6fffb',
            },
            img:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ',
          },
        });
        graph.updateChild(model, model.id);
      } else if (name === 'remove-item') {
        graph.removeChild(model.id);
      }
    }
  });

  if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
};

const Flow = () => {
  const container = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setTimeout(()=> initGraph(), 1000);
  }, [])

  return <div id="container" />
};

export default Flow;
