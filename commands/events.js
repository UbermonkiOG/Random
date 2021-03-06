/* *
 * DiscoBot - Gaymers Discord Bot
 * Copyright (C) 2015 - 2017 DiscoBot Authors
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 * */

const Discord = require('discord.js');
const https = require('https');

module.exports = {
  usage: '',
  description: 'List upcoming server events.',
  allowDM: false,
  process: (bot, message) => {
    const options = {
      host: 'events.gaymers.gg',
      path: '/',
      method: 'GET'
    };

    const request = https.get(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        buildEmbeds(JSON.parse(data), message);
      });
    });

    request.end();
  }
};

function buildEmbeds(events, message) {
  let embeds = [];

  if (events.length < 1) {
    noEvents(message);
    return;
  }

  for (let event of events) {
    if (Date.parse(event.start) < Date.now()) {
      continue;
    }

    const embed = new Discord.RichEmbed();

    embed.setTitle(event.title);
    embed.setDescription(event.description);
    embed.setTimestamp(event.start);
    embed.setURL('https://gaymers.gg/events');

    if (event.image) {
      embed.setImage(event.image);
    }

    embed.addField(
      'Sign up for this event:',
      '!event join ' + event.id,
      true
    );

    embeds.push(embed);
  }

  if (embeds.length < 1) {
    noEvents(message);
    return;
  }

  message.reply('Here\'s the upcoming events:');

  for (let embed of embeds) {
    message.channel.send({embed: embed});
  }
}

function noEvents(message) {
  message.reply('Sorry, no events are scheduled right now. Check back later!');
}
