export function JSDateFormat() {
  let datetime = new Date();
  let temp = datetime.toLocaleDateString('pt-BR');
  if (datetime.getUTCHours() !== 0) {
    const hour = datetime.getHours();
    const minute = datetime.getMinutes();
    const second = datetime.getSeconds();
    temp += ' ' + hour;
    temp += (minute < 10 ? ':0' : ':') + minute;
    temp += (second < 10 ? ':0' : ':') + second;
  }
  return temp;
}

export function getMessageHTML(message: string = '', { emotes }: any) {
  if (!emotes) return message;

  // store all emote keywords
  // ! you have to first scan through
  // the message string and replace later
  const stringReplacements: any = [];

  // iterate of emotes to access ids and positions
  Object.entries(emotes).forEach(([id, positions]: any) => {
    // use only the first position to find out the emote key word
    const position = positions[0];
    const [start, end] = position.split('-');
    const stringToReplace = message.substring(
      parseInt(start, 10),
      parseInt(end, 10) + 1
    );

    stringReplacements.push({
      stringToReplace: stringToReplace,
      replacement: `<img src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0">`,
    });
  });

  // generate HTML and replace all emote keywords with image elements
  const messageHTML = stringReplacements.reduce(
    (acc: string, { stringToReplace, replacement }: any) => {
      // obs browser doesn't seam to know about replaceAll
      return acc.split(stringToReplace).join(replacement);
    },
    message
  );

  return messageHTML;
}

// var Benchmark = require(benchmark); //https://www.npmjs.com/package/benchmark

// function emitMessage(channel, user, message, action) {
//   console.log('message is: `' + message + '`');
//   console.log('emote list: `' + user['emotes'] + '`');

//   var suite = new Benchmark.Suite();

//   suite
//     .add('alca design parse ', function () {
//       formatEmotes(message, user['emotes']);
//     })
//     .add('ltr string concat ', function () {
//       parseMessage(message, user['emotes']);
//     })
//     .add('unordered char rep', function () {
//       parseMessage2(message, user['emotes']);
//     })
//     .on('cycle', function (event) {
//       console.log(String(event.target));
//     })
//     .on('complete', function () {
//       console.log('Fastest is ' + this.filter('fastest').pluck('name') + '\n');
//     })
//     .run({
//       async: true,
//     });
// }

export function formatEmotes(text: string = '', emotes: any) {
  var splitText = text.split('');
  for (var i in emotes) {
    var e = emotes[i];
    for (var j in e) {
      var mote = e[j];
      if (typeof mote == 'string') {
        mote = mote.split('-');
        mote = [parseInt(mote[0]), parseInt(mote[1])];
        var length = mote[1] - mote[0],
          empty = Array.apply(null, new Array(length + 1)).map(function () {
            return '';
          });
        splitText = splitText
          .slice(0, mote[0])
          .concat(empty)
          .concat(splitText.slice(mote[1] + 1, splitText.length));
        splitText.splice(
          mote[0],
          1,
          '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' +
            i +
            '/3.0">'
        );
      }
    }
  }
  return splitText.join('');
}

// function parseMessage(message, emotes) {
//   var newMessage = '';
//   var lastEndIndex = 0;

//   _.chain(emotes)
//     .map(function (emote, index) {
//       var charIndex = _.map(emote, function (chars) {
//         var indexes = chars.split('-');

//         var startIndex = parseInt(indexes[0]);
//         var endIndex = parseInt(indexes[1]) + 1;
//         var name = message.substring(startIndex, endIndex);

//         return {
//           url: makeImage(
//             name,
//             'http://static-cdn.jtvnw.net/emoticons/v1/' + index + '/1.0'
//           ),
//           startIndex: startIndex,
//           endIndex: endIndex,
//         };
//       });

//       return charIndex;
//     })
//     .flatten()
//     .sortBy(function (item) {
//       return item.startIndex;
//     })
//     .each(function (emote) {
//       newMessage +=
//         message.substring(lastEndIndex, emote.startIndex) + emote.url;

//       lastEndIndex = emote.endIndex;
//     });

//   return newMessage + message.substring(lastEndIndex);
// }

// function parseMessage2(message, emotes) {
//   var newMessage = message.split('');

//   for (var emoteIndex in emotes) {
//     var emote = emotes[emoteIndex];

//     for (var charIndexes in emote) {
//       var emoteIndexes = emote[charIndexes];

//       if (typeof emoteIndexes == 'string') {
//         emoteIndexes = emoteIndexes.split('-');
//         emoteIndexes = [parseInt(emoteIndexes[0]), parseInt(emoteIndexes[1])];

//         for (var i = emoteIndexes[0]; i <= emoteIndexes[1]; ++i) {
//           newMessage[i] = '';
//         }

//         newMessage[emoteIndexes[0]] =
//           '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' +
//           emoteIndex +
//           '/3.0">';
//       }
//     }
//   }

//   return newMessage.join('');
// }

export interface userbadgesProps {
  admin: {
    alpha: string;
    image: string;
    svg: string;
  };
  broadcaster: {
    alpha: string;
    image: string;
    svg: string;
  };
  global_mod: {
    alpha: string;
    image: string;
    svg: string;
  };
  mod: {
    alpha: string;
    image: string;
    svg: string;
  };
  staff: {
    alpha: string;
    image: string;
    svg: string;
  };
  subscriber: null;
  turbo: {
    alpha: string;
    image: string;
    svg: string;
  };
}

const userbadges = {
  admin: {
    alpha: 'https://static-cdn.jtvnw.net/chat-badges/admin-alpha.png',
    image: 'https://static-cdn.jtvnw.net/chat-badges/admin.png',
    svg: 'https://static-cdn.jtvnw.net/chat-badges/admin.svg',
  },
  broadcaster: {
    alpha: 'https://static-cdn.jtvnw.net/chat-badges/broadcaster-alpha.png',
    image: 'https://static-cdn.jtvnw.net/chat-badges/broadcaster.png',
    svg: 'https://static-cdn.jtvnw.net/chat-badges/broadcaster.svg',
  },
  global_mod: {
    alpha: 'https://static-cdn.jtvnw.net/chat-badges/globalmod-alpha.png',
    image: 'https://static-cdn.jtvnw.net/chat-badges/globalmod.png',
    svg: 'https://static-cdn.jtvnw.net/chat-badges/globalmod.svg',
  },
  mod: {
    alpha: 'https://static-cdn.jtvnw.net/chat-badges/mod-alpha.png',
    image: 'https://static-cdn.jtvnw.net/chat-badges/mod.png',
    svg: 'https://static-cdn.jtvnw.net/chat-badges/mod.svg',
  },
  staff: {
    alpha: 'https://static-cdn.jtvnw.net/chat-badges/staff-alpha.png',
    image: 'https://static-cdn.jtvnw.net/chat-badges/staff.png',
    svg: 'https://static-cdn.jtvnw.net/chat-badges/staff.svg',
  },
  subscriber: {
    alpha: '',
    image: '',
    svg: '',
  },
  turbo: {
    alpha: 'https://static-cdn.jtvnw.net/chat-badges/turbo-alpha.png',
    image: 'https://static-cdn.jtvnw.net/chat-badges/turbo.png',
    svg: 'https://static-cdn.jtvnw.net/chat-badges/turbo.svg',
  },
};

export function getBadges(obj: object = []) {
  let resp: string[] = [];
  let i = 0;
  if (obj !== null) {
    if (Object.keys(obj).length !== 0) {
      let user = Object.keys(obj);
      console.log(`getBadges user=${JSON.stringify(user)}`);
      let map = new Map(Object.entries(userbadges));
      console.log(`getBadges map=${JSON.stringify(map)}`);
      Object.entries(user).forEach(([key, value]) => {
        console.log(`getBadges forEach ${key}: ${value}`);
        if (map.has(value)) {
          const mapin = map.get(value);
          console.log(`getBadges mapin=${JSON.stringify(mapin)}`);
          console.log(`getBadges mapin?.svg=${JSON.stringify(mapin?.svg)}`);
          if (mapin) {
            resp[i] = mapin?.image;
            i = i + 1;
          }
          console.log(`getBadges resp=${JSON.stringify(resp)}`);
        }
      });
    }

    return resp;
  }
}
