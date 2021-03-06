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

const splitargs = require('splitargs');

module.exports = {
  usage: 'Message to display,',
  description: 'Set the status of the bot.',
  allowDM: false,
  requireRoles: ['Admin', 'Moderator'],
  process: (bot, message) => {

    const status = splitargs(message.content);
    status.shift();

    const statusMessage = status.join(' ');

    if (status.length > 0) {
      bot.user.setGame(statusMessage);
    } else {
      bot.user.setGame(null);
    }
  }
};
