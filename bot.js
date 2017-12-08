const Discord = require("discord.js");
const config = require('./config.json')
const prefix = config.prefix;
const token = config.token;
var bot = new Discord.Client();

bot.on("ready", function() {
  bot.user.setGame('_help')
  console.log("Bot is online!");
});


bot.on("guildMemberAdd", function(member) {
  member.build.channels.find("name", "welcome").send(member.toString() + " welcome to the Walrus Squad!")
  
  member.addRole(member.guild.roles.find("name", "W | Walruses"));


})

bot.on("message", function(message) {
  if(message.author.equals(bot.user)) return;

  if(!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0]) {
    case "ping":
      message.channel.send('Pinging...').then((msg) => {
      msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API latency is ${Math.round(bot.ping)}`);
      })
      break;
      //Always start before the "default"
    default:
      message.channel.send("Invalid Command! Please use _help for a list of commands!");
      break;
    case "help":
      message.channel.send("I have sent you a DM with the info!")
      var embed = new Discord.RichEmbed()
        .addField("Command List", "This is the list of usable commands!")
        .addField("The prefix for this bot is _", "Use this in front of the commands!")
        .addField("Ping", "Pings the bot!")
        .addField("Help", "Shows the bot commands!")
        .addField("NoticeMe", "Notices you!")
        .addField("Owner", "Displays who the owner of the bot is!")
        .addField("Patreon", "Sends a link to visit my patreon page!")
        .addField("Yt or Youtube", "Sends a link to my youtube page!")
      message.author.send(embed);
      break;
      case "noticeme":
        message.channel.send(message.author.toString() + " I HAVE NOTICED YOU!");
        break;
      case "owner":
        message.channel.send('<@335682119982514180> is the owner of the bot!');
        break;
      case "patreon":
        message.channel.send('https://www.patreon.com/theonlywalrus');
        break;
      case "yt":
        message.channel.send('https://www.youtube.com/channel/UC1Ja1P-srYEbAwoRkCszPYg');
        break;
      case "youtube":
        message.channel.send('https://www.youtube.com/channel/UC1Ja1P-srYEbAwoRkCszPYg')
        break;
  }
});
bot.login(config.token)