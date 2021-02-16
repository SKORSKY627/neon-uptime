require("express")().listen(1343); 

const db = require("quick.db");
const discord = require("discord.js"); 
const client = new discord.Client({ disableEveryone: true }); 
client.login(process.env.token);
const fetch = require("node-fetch");
const fs = require("fs"); 

setInterval(() => {
  var links = db.get("linkler"); 
  if (!links) return;
  var linkA = links.map(c => c.url); 
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Başarıyla Pinglendi."); 
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    
    db.set("linkler", []);
  } 
});

client.on("ready", () => {
  client.user.setActivity(`n!ekle | DM'den kullan!`); 
  console.log(`Logined`); 
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "n!ekle") {
    var link = spl[1]; 
    fetch(link)
      .then(() => {
        
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
          return message.channel.send("**\<a:ReddetmekGif:805190091273142323> Bu bot zaten uptime ediliyor.**"); 

        let yardım = new Discord.RichEmbed() 
          .setAuthor(client.user.username)
          .setColor(0x6a3db8)
          .setDescription(`**\<a:NeonEVET:805478484507361322> Başarılı! Projeniz artık 7/24!**
          
          Neon UPTime Tercih Ettiğiniz İçin Teşekkürler Dilerseniz Diyer Botlarımızda'da Göz Atabilrisiniz..
          `) 
          .setFooter(`© ${client.user.username}`)
          .setTimestamp()
        .addField("» Bağlantılar", `[\<:neon:802711574501523507>  Sunucuna Ekle](https://discord.com/oauth2/authorize?client_id=801826279203667998&permissions=21474836398&scope=bot) | [🎶 Neon Müzik Botumuz ](https://discord.com/api/oauth2/authorize?client_id=800092894123393034&permissions=305428816&scope=bot) | [:ballot_box: Bota Oy Ver](LİNK) | [☎️ Destek Sunucusu](https://discord.gg/G5vfnuvVsb) | [:newspaper: Site](https://craftneon.com/)`, false)

        message.channel.send(yardım).then(msg => msg.delete(60000)); 
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        let yardım = new Discord.RichEmbed() 
          .setAuthor(client.user.username)
          .setColor(0x6a3db8)
          .setDescription(
            "\<a:NeonHAYIR:805479469007372358> **Hata! Sadece düzgün url'ler ekleyebilirsiniz.**"
          ) 
          .setFooter(`© ${client.user.username}`)
          .setTimestamp();
        return message.channel.send(yardım).then(msg => msg.delete(60000)); 
      }); 
  }
});

client.on("message", message => {
  
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "n!botsay") {
    
    var link = spl[1];
    message.channel.send(`**||${db.get("linkler").length}|| Proje Uptime Ediyorum \<a:SariOkey:805478910019895317> **`);
  }
});


const Discord = require("discord.js");

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "n!yardım") {
    let embed = new Discord.RichEmbed() 
      .setColor("#070706")

      .setDescription(
        `**Uptime komudunu kullandıktan sonra sisteme eklenmesi için 3-5 dk bekleyin.**

 \<a:KirmiziDiamond:805174192609558548> **n!yardım** : Botun yardım menüsünü açar.

 \<a:YesilOkey:805174191279308821> **n!ekle <link>** : Eklediğiniz proje linkini 7/24 açık yapar.

 \<a:NeonThink:805192008963588116>  **n!botsay** : Bot'umuzla uptime olan proje sayısını gösterir.

 \<a:DiscordYetkiliGF:805199983660892190> **n!botbilgi** : Bot'un istastistik verilerini gösterir.


`
      )
            .addField("» Bağlantılar", `[\<:neon:802711574501523507>  Sunucuna Ekle](https://discord.com/oauth2/authorize?client_id=801826279203667998&permissions=21474836398&scope=bot) | [🎶 Neon Müzik Botumuz ](https://discord.com/api/oauth2/authorize?client_id=800092894123393034&permissions=305428816&scope=bot) | [:ballot_box: Bota Oy Ver](LİNK) | [☎️ Destek Sunucusu](https://discord.gg/G5vfnuvVsb) | [:newspaper: Site](https://craftneon.com/)`, false)

      .setAuthor(`Neon UPTime | Yardım Menüsü`, client.user.avatarURL)
      .setFooter(`Neon UPTime | `) 
    .setTimestamp();
    return message.channel.send(embed); 
  }
});
const log = message => {
  
  console.log(`${message}`);
};

client.on("message", message => {
  
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "n!botbilgi") {
    var link = spl[1];
    message.channel.send(`***çok yakında eklenecek!***`); 
  }
});


