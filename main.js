import DashButton from 'dash-button';
import osc from 'oscsocket';
import DASH_BUTTON_MAC_ADDRESS from './dash-button-mac-address';

let button = new DashButton(DASH_BUTTON_MAC_ADDRESS);

console.log('listening');

const sock = new osc.OSCSocket();

let socket = new osc.OSCSocket();
socket.bind({
  port: 5555,
  address: '127.0.0.1'
});
socket.on('/osc/from/unity', (message) => {
  console.log('/osc/from/unity');
  console.log(message);
});

button.addListener(() => {
  console.log('It works.');

  // something codes
  let msg = new osc.OSCMessage();
  msg.address = '/osc/from/electron';
  msg.addArgument('i', 100);
  msg.addArgument('s', 'String value.');
  sock.send(msg, 6666, '127.0.0.1');
});