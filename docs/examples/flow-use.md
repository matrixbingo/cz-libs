---
title: flow
nav:
  title: 组件
  order: 3
---

# Flow

### button-loading

```jsx | pure
<ButtonLoading type="link">
  ButtonLoading
</ButtonLoading>
```

<code src="./demo/flow/flow-use.tsx" />

## API
### button-loading

| 参数       | 说明             | 类型                                | 默认值 |
| --------  | ---------------- | ----------------------------------- | ------ |
| timeout   | loading毫秒     | number                                | 2000  |
| onClick   | 点击按钮时的回调 | (event) => void                      | -      |

其他 ButtonProps https://ant.design/components/button-cn/#API

### button-copy

| 参数     | 说明             | 类型                        | 默认值 |
|----------|------------------|-----------------------------|--------|
| value    | 需要copy的值     | string                      | -      |
| onChange | 修改的回调       | (value: string) => void;    | -      |
| children | 提交前格式化数据 | children?: React.ReactNode; | -      |

其他 CopyToClipboard.Props https://www.npmjs.com/package/@types/react-copy-to-clipboard
