import { Button } from 'antd';
import {React, mountNode} from 'react';
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
    <Button type="link">Link</Button>
  </div>,
  mountNode,
);

export default Button