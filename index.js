
const serverId = 'xxx';
const textChannelId = 'xxx';
const token = 'xxx';

const commandPrefix = '!';

import { Client } from 'guilded.js';

//
//
//

async function commandFlare(args) {
  console.log(`commandFlare(args=${args})`);
  let target = args[0];
  await sendChannelText(textChannelId, `TODO: Find target=${target} users and send flare`);
  const members = await guilded.members.fetchMany(serverId);
  members.forEach(member => {
    console.log('member.user.name', member.user.name);
  })
}

//
//
//

async function sendChannelText(channelId, text) {
  console.log(`sendChannelText(channelId=${channelId}, text="${text}")`);
  await guilded.messages.send(textChannelId, text);
}

function connect() {
  const guilded = new Client({ token });
  guilded.on('ready', () => {
    console.log(`ready: arguments`, arguments);
    console.log('connected to Guilded!');
    sendChannelText(textChannelId, 'FlareBot at your service!\nCommands:\n!flare ...');
  });
  guilded.on('exit', () => {
    console.log(`exit: arguments`, arguments);
  });
  guilded.on('error', () => {
    console.log(`error: arguments`, arguments);
  });
  guilded.on('messageCreated', async (message) => {
    //console.log(`messageCreated: message`, message);
    const {id: messageId, content, channelId} = message;
    if (!content.startsWith(commandPrefix)) return;
    if (channelId != textChannelId) return;
    //console.log(`messageCreated: content`, content);
    let [commandName, ...args] = content.slice(commandPrefix.length).trim().split(/ +/);
    commandName = commandName.toLowerCase();
    //console.log('messageCreated: commandName', commandName);
    //console.log('messageCreated: args', args);
    if (commandName == 'flare') {
      await commandFlare(args);
    }
  });
  guilded.login();
  return guilded;
}

const guilded = connect();
