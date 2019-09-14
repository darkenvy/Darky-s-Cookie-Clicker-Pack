// ==UserScript==
// @name         Darky's Achievement Pack
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Darky's Achievement Pack for Tampermonkey
// @author       u/DarkSoul1800 (creator) & darkenvy (cleanup)
// @match        https://orteil.dashnet.org/cookieclicker/
// @match        http://orteil.dashnet.org/cookieclicker/
// @grant        none
// ==/UserScript==
/* globals Game, PlaySound */

(function () {
  'use strict';

  const DarkySavePrefix = 'DarkyPackage';
  const Darky = {};
  let DarkySave;

  function addDarkyCSS() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = '.darky:before{background:url(https://i.imgur.com/q8nNdkI.png);background-position:120px 0px;}';
    document.head.appendChild(style);
  }

  function DarkySaveConfig() {
    localStorage.setItem(DarkySavePrefix, JSON.stringify(DarkySave));
  }

  function DarkySaveDefault() {
    DarkySave = {};
    for (var i in Game.Achievements) {
      var me = Game.Achievements[i];
      if (me.darky == 1) {
        DarkySave[me.name] = 0;
      }
    }
    DarkySaveConfig();
  }

  function DarkyLoadConfig() {
    if (localStorage.getItem(DarkySavePrefix) != null) {
      DarkySave = JSON.parse(localStorage.getItem(DarkySavePrefix));
      for (var i in Game.Achievements) {
        var me = Game.Achievements[i];
        if (me.darky == 1) {
          if (typeof DarkySave[me.name] === 'undefined') {
            DarkySave[me.name] = 0;
            DarkySaveConfig();
          }
          else if (DarkySave[me.name] == 1) {
            Game.Win(me.name);
          }
        }
      }
    }
    else {
      DarkySaveDefault();
    }
  }

  function main() {
    Game.AchievementBackup = Game.Achievement;
    Game.Achievement = function(name, desc, icon, darky) {
      var answer = new Game.AchievementBackup(name, desc, icon);
      if (darky == 1) {
        answer.darky = 1;
      }
      return answer;
    }

    Game.WinBackup = Game.Win;
    Game.Win = function(what) {
      Game.WinBackup(what);
      if (typeof Game.Achievements[what] !== 'undefined' && Game.Achievements[what].darky == 1) {
        DarkySave[what] = 1;
        DarkySaveConfig();
      }
    }

    eval('Game.crate = ' + Game.crate.toString().split(' shadow\';').join(' shadow\'; if (me.darky == 1) classes+=\' darky\';').split('mysterious?').join('mysterious? (me.darky == 1) ? \'background-image:url(\\\'https://i.imgur.com/JKKvixm.png\\\')\' : '));

    // todo: this line is broken
    // eval('Game.crateTooltip = ' + Game.crateTooltip.toString().split('if (mysterious) icon=[0,7];').join('if (mysterious) icon=[0,7]; if (mysterious && me.darky == 1) icon = [0, 0, \'https://i.imgur.com/JKKvixm.png\']'));



    addDarkyCSS();

    //-------------------------------------------------------------------

    Game.customCrate = [

      // X OF BUILDINGS

      new Game.Achievement('Squeak goes the mouse', 'Have <b>700</b> cursors.', [0, 17], 1),
      new Game.Achievement('I\'m too old for this', 'Have <b>600</b> grandmas.', [1, 21], 1),
      new Game.Achievement('Gorden garden', 'Have <b>550</b> farms.', [2, 30], 1),
      new Game.Achievement('A fine mine you got there', 'Have <b>550</b> mines.', [3, 30], 1),
      new Game.Achievement('Working 24/7', 'Have <b>550</b> factories.', [4, 30], 1),
      new Game.Achievement('Bank on it', 'Have <b>550</b> banks.', [15, 30], 1),
      new Game.Achievement('Temple pun', 'Have <b>550</b> temples.', [16, 30], 1),
      new Game.Achievement('It\'s magic, Joel!', 'Have <b>550</b> wizard towers.', [17, 30], 1),
      new Game.Achievement('My shipment arrives in the morning', 'Have <b>550</b> shipments.', [5, 30], 1),
      new Game.Achievement('Turning cookies into gold since 2013', 'Have <b>550</b> alchemy labs.', [6, 30], 1),
      new Game.Achievement('A portal inside of a portal', 'Have <b>550</b> portals.', [7, 30], 1),
      new Game.Achievement('It all began on the 8th of August, 2013', 'Have <b>550</b> time machines.', [8, 30], 1),
      new Game.Achievement('AntimatterCon', 'Have <b>550</b> antimatter condensers.', [13, 30], 1),
      new Game.Achievement('Stop being a prissm', 'Have <b>550</b> prisms.', [14, 30], 1),
      new Game.Achievement('And yet you probably never got a blab', 'Have <b>550</b> chancemakers.', [19, 30], 1),
      new Game.Achievement('Gouchnox', 'Have <b>550</b> fractal engines.<q>69</q>', [20, 30], 1),

      // COOKIES FROM CLICKING

      new Game.Achievement('Stop it, it clickles', 'Make <b>1 octillion</b> cookies from clicking.', [11, 21], 1),
      new Game.Achievement('Keep up the click', 'Make <b>100 octillion</b> cookies from clicking.', [0, 47, 'https://i.imgur.com/3jNJJNw.png'], 1),
      new Game.Achievement('Clicking is the new booping', 'Make <b>10 nonillion</b> cookies from clicking.', [0, 52, 'https://i.imgur.com/3jNJJNw.png'], 1),
      new Game.Achievement('The final click', 'Make <b>1 decillion</b> cookies from clicking.<q>But its never over.</q>', [0, 46, 'https://i.imgur.com/3jNJJNw.png'], 1),

      // BUILDINGS

      new Game.Achievement('Owner of Buildings', 'Own <b>3000</b> buildings.', [0, 0, 'https://i.imgur.com/GGrHHrA.png'], 1),
      new Game.Achievement('Build up', 'Own <b>4000</b> buildings.', [1, 0, 'https://i.imgur.com/GGrHHrA.png'], 1),
      new Game.Achievement('World-dominating company', 'Own <b>5000</b> buildings.', [2, 0, 'https://i.imgur.com/GGrHHrA.png'], 1),
      new Game.Achievement('Creator of the Cookieverse', 'Own <b>6000</b> buildings.', [3, 0, 'https://i.imgur.com/GGrHHrA.png'], 1),
      new Game.Achievement('Build until you can\'t build anymore', 'Own <b>7000</b> buildings.', [4, 0, 'https://i.imgur.com/GGrHHrA.png'], 1),
      new Game.Achievement('You built the guilt', 'Own <b>8000</b> buildings.', [5, 0, 'https://i.imgur.com/RWbOLsf.png'], 1),

      // UPGRADES

      new Game.Achievement('Purchaser of Upgrades', 'Purchase <b>300</b> upgrades.', [0, 1, 'https://i.imgur.com/GGrHHrA.png'], 1),
      new Game.Achievement('Grade up', 'Purchase <b>400</b> upgrades.', [1, 1, 'https://i.imgur.com/GGrHHrA.png'], 1),

      // X OF EVERYTHING

      new Game.Achievement('Quincentennial and a half', 'Have at least <b>550 of everything</b>.<q>Yes I just did that.</q>', [29, 26], 1),

      // BIG COOKIE CLICKS

      new Game.Achievement('Clicker', 'Click on the big cookie <b>1,000</b> times.', [11, 22], 1),
      new Game.Achievement('Advanced Clicker', 'Click on the big cookie <b>10,000</b> times.', [11, 23], 1),
      new Game.Achievement('Expert Clicker', 'Click on the big cookie <b>25,000</b> times.', [11, 24], 1),

      // PRESTIGE LEVEL

      new Game.Achievement('Heavenly', 'Reach prestige level <b>100</b>.', [19, 7], 1),
      new Game.Achievement('Transcendent', 'Reach prestige level <b>10,000</b>.', [18, 7], 1),
      new Game.Achievement('Higher energy state', 'Reach prestige level <b>1 million</b>.', [17, 7], 1),
      new Game.Achievement('Omniverse', 'Reach prestige level <b>100 million</b>.', [16, 7], 1),
      new Game.Achievement('The Ascendant', 'Reach prestige level <b>10 billion</b>.', [15, 7], 1),

      // PRESTIGE UPGRADES

      new Game.Achievement('Secret fortune', 'Purchase the <b>3 secret prestige upgrades</b>.<q>You got more than one ace up your sleeve, huh?', [24, 15], 1),
      new Game.Achievement('Pretty prestige', 'Purchase <b>15</b> prestige upgrades.', [19, 48, 'https://i.imgur.com/3jNJJNw.png'], 1),
      new Game.Achievement('Live and learn', 'Purchase <b>30</b> prestige upgrades.<q>And never forget.', [19, 47, 'https://i.imgur.com/3jNJJNw.png'], 1),
      new Game.Achievement('We will stay with you forever', 'Purchase <b>60</b> prestige upgrades.<q>Don\'t reset us.</q>', [19, 46, 'https://i.imgur.com/3jNJJNw.png'], 1),

      // COOKIE UPGRADES

      new Game.Achievement('Getting fancy', 'Purchase <b>all fancy biscuits</b>.', [21, 8], 1),
      new Game.Achievement('Emmanuel Macaron', 'Purchase <b>all macarons</b>.', [20, 8], 1),
      new Game.Achievement('You wanna be popular?', 'Purchase <b>all popular biscuits</b>.', [20, 9], 1),
      new Game.Achievement('Rich butterfingers', 'Purchase <b>all rich butter cookies</b>.', [21, 9], 1),
      new Game.Achievement('Pastries from the past', 'Purchase <b>all pastries</b>.', [27, 29], 1),
      new Game.Achievement('Bake me, maybe?', 'Purchase <b>all maybe cookies</b>.', [25, 29], 1),
      new Game.Achievement('Burger Clicker', 'Purchase <b>all not cookies</b>.<q>Shoutout to the old Idle Game Maker!</q>', [26, 29], 1),
      new Game.Achievement('Collecting these is like growing plants', 'Purchase <b>all plant upgrades</b>.<q>It takes a looooong time.</q>', [24, 25], 1),

      // BUILDING LEVEL

      new Game.Achievement('Level 1 complete!', 'Reach level <b>1</b> of every building.', [0, 2, 'https://i.imgur.com/GGrHHrA.png'], 1),
      new Game.Achievement('Five Hive', 'Reach level <b>5</b> of every building.', [1, 2, 'https://i.imgur.com/GGrHHrA.png'], 1),

      // OTHER

      new Game.Achievement('Purrfect Perfection', 'Purrchase <b>every kitten upgrade</b>.<q>Are you sick of these puns yet?</q>', [26, 7], 1),
      new Game.Achievement('It\'s sweet, sweet, sweet Synergy', 'Purchase <b>all Synergy I upgrades</b>.<q>It\'s ours for the baking.</q>', [9, 20], 1),
      new Game.Achievement('Out of Energy? Get Synergy!', 'Purchase <b>all Synergy II upgrades</b>.', [9, 29], 1),
      new Game.Achievement('All you had to do was ask', 'Click this custom achievement\'s slot.<q>Here you go.</q>', [2, 4, 'https://i.imgur.com/sl3FeNY.png'], 1), Game.last.clickFunction = function () { if (!Game.HasAchiev('All you had to do was ask')) { PlaySound('snd/tick.mp3'); Game.Win('All you had to do was ask'); } },

      // SHADOW

      new Game.Achievement('Mod-God complex', 'Name yourself <b>Darky</b>.<q>Ducky.</q>', [2, 12], 1), Game.last.pool = "shadow",
      new Game.Achievement('Golden Jackpot', 'Click <b>77,777 golden cookies</b>.', [0, 3, 'https://i.imgur.com/GGrHHrA.png'], 1), Game.last.pool = "shadow",
      new Game.Achievement('I like playing supportive characters', 'Dashnet reached <b>10</b> heralds.', [21, 29], 1), Game.last.pool = "shadow",
      new Game.Achievement('That\'s a lot of money', 'Dashnet reached <b>25</b> heralds.', [21, 29], 1), Game.last.pool = "shadow",
      new Game.Achievement('You really want us to make games for you, huh?', 'Dashnet reached <b>50</b> heralds.', [21, 29], 1), Game.last.pool = "shadow",
      new Game.Achievement('Thank you guys so much!', 'Dashnet reached <b>100</b> heralds.', [21, 29], 1), Game.last.pool = "shadow",
    ]

    //-------------------------------------------------------------------

    Game.Achievements['Polymath'].order = 6008
    Game.Achievements['Renaissance baker'].order = 6009
    Game.Achievements['The elder scrolls'].order = 6010
    Game.Achievements['Sacrifice'].order = 30015
    Game.Achievements['Oblivion'].order = 30016
    Game.Achievements['From scratch'].order = 30017
    Game.Achievements['Third-party'].order = 30202
    Game.Achievements['Tabloid addiction'].order = 11002

    Game.Achievements['Squeak goes the mouse'].order = 1060
    Game.Achievements['I\'m too old for this'].order = 1110
    Game.Achievements['Gorden garden'].order = 1210
    Game.Achievements['A fine mine you got there'].order = 1310
    Game.Achievements['Working 24/7'].order = 1410
    Game.Achievements['My shipment arrives in the morning'].order = 1510
    Game.Achievements['Turning cookies into gold since 2013'].order = 1610
    Game.Achievements['A portal inside of a portal'].order = 1710
    Game.Achievements['It all began on the 8th of August, 2013'].order = 1810
    Game.Achievements['AntimatterCon'].order = 1910
    Game.Achievements['Stop being a prissm'].order = 2010
    Game.Achievements['Bank on it'].order = 1430
    Game.Achievements['Temple pun'].order = 1460
    Game.Achievements['It\'s magic, Joel!'].order = 1480
    Game.Achievements['And yet you probably never got a blab'].order = 2110
    Game.Achievements['Gouchnox'].order = 2210

    Game.Achievements['Stop it, it clickles'].order = 1010
    Game.Achievements['Keep up the click'].order = 1011
    Game.Achievements['Clicking is the new booping'].order = 1012
    Game.Achievements['The final click'].order = 1013

    Game.Achievements['Owner of Buildings'].order = 5010
    Game.Achievements['Build up'].order = 5011
    Game.Achievements['World-dominating company'].order = 5012
    Game.Achievements['Creator of the Cookieverse'].order = 5013
    Game.Achievements['Build until you can\'t build anymore'].order = 5014
    Game.Achievements['You built the guilt'].order = 5015

    Game.Achievements['Purchaser of Upgrades'].order = 6001
    Game.Achievements['Grade up'].order = 6002

    Game.Achievements['Quincentennial and a half'].order = 7003

    Game.Achievements['Heavenly'].order = 30010
    Game.Achievements['Transcendent'].order = 30011
    Game.Achievements['Higher energy state'].order = 30012
    Game.Achievements['Omniverse'].order = 30013
    Game.Achievements['The Ascendant'].order = 30014

    Game.Achievements['Clicker'].order = 1014
    Game.Achievements['Advanced Clicker'].order = 1015
    Game.Achievements['Expert Clicker'].order = 1016

    Game.Achievements['Secret fortune'].order = 32001

    Game.Achievements['Getting fancy'].order = 21101
    Game.Achievements['Emmanuel Macaron'].order = 21102
    Game.Achievements['You wanna be popular?'].order = 21103
    Game.Achievements['Rich butterfingers'].order = 21104
    Game.Achievements['Pastries from the past'].order = 21105
    Game.Achievements['Bake me, maybe?'].order = 21106
    Game.Achievements['Burger Clicker'].order = 21107
    Game.Achievements['Collecting these is like growing plants'].order = 21108

    Game.Achievements['Level 1 complete!'].order = 5015
    Game.Achievements['Five Hive'].order = 5016

    Game.Achievements['Pretty prestige'].order = 6003
    Game.Achievements['Live and learn'].order = 6004
    Game.Achievements['We will stay with you forever'].order = 6005

    Game.Achievements['Purrfect Perfection'].order = 21109
    Game.Achievements['It\'s sweet, sweet, sweet Synergy'].order = 6006
    Game.Achievements['Out of Energy? Get Synergy!'].order = 6007
    Game.Achievements['All you had to do was ask'].order = 11001

    Game.Achievements['Mod-God complex'].order = 30201

    //-------------------------------------------------------------------

    Darky.prestigeUpgradesOwned = 0;

    //-------------------------------------------------------------------

    Game.customChecks = [
      () => { var count = 0; for (var i in Game.UpgradesById) { var me = Game.UpgradesById[i]; if (me.bought && me.pool == 'prestige') count++; } Darky.prestigeUpgradesOwned = count; },

      () => { if (Game.Objects['Cursor'].amount >= 700) Game.Win('Squeak goes the mouse') },
      () => { if (Game.Objects['Grandma'].amount >= 600) Game.Win('I\'m too old for this') },
      () => { if (Game.Objects['Farm'].amount >= 550) Game.Win('Gorden garden') },
      () => { if (Game.Objects['Mine'].amount >= 550) Game.Win('A fine mine you got there') },
      () => { if (Game.Objects['Factory'].amount >= 550) Game.Win('Working 24/7') },
      () => { if (Game.Objects['Bank'].amount >= 550) Game.Win('Bank on it') },
      () => { if (Game.Objects['Temple'].amount >= 550) Game.Win('Temple pun') },
      () => { if (Game.Objects['Wizard tower'].amount >= 550) Game.Win('It\'s magic, Joel!') },
      () => { if (Game.Objects['Shipment'].amount >= 550) Game.Win('My shipment arrives in the morning') },
      () => { if (Game.Objects['Alchemy lab'].amount >= 550) Game.Win('Turning cookies into gold since 2013') },
      () => { if (Game.Objects['Portal'].amount >= 550) Game.Win('A portal inside of a portal') },
      () => { if (Game.Objects['Time machine'].amount >= 550) Game.Win('It all began on the 8th of August, 2013') },
      () => { if (Game.Objects['Antimatter condenser'].amount >= 550) Game.Win('AntimatterCon') },
      () => { if (Game.Objects['Prism'].amount >= 550) Game.Win('Stop being a prissm') },
      () => { if (Game.Objects['Chancemaker'].amount >= 550) Game.Win('And yet you probably never got a blab') },
      () => { if (Game.Objects['Fractal engine'].amount >= 550) Game.Win('Gouchnox') },
      () => { if (Game.handmadeCookies >= 1000000000000000000000000000) Game.Win('Stop it, it clickles') },
      () => { if (Game.handmadeCookies >= 100000000000000000000000000000) Game.Win('Keep up the click') },
      () => { if (Game.handmadeCookies >= 10000000000000000000000000000000) Game.Win('Clicking is the new booping') },
      () => { if (Game.handmadeCookies >= 1000000000000000000000000000000000) Game.Win('The final click') },
      () => { if (Game.Objects['Cursor'].amount + Game.Objects['Grandma'].amount + Game.Objects['Farm'].amount + Game.Objects['Factory'].amount + Game.Objects['Mine'].amount + Game.Objects['Bank'].amount + Game.Objects['Temple'].amount + Game.Objects['Wizard tower'].amount + Game.Objects['Shipment'].amount + Game.Objects['Alchemy lab'].amount + Game.Objects['Portal'].amount + Game.Objects['Time machine'].amount + Game.Objects['Antimatter condenser'].amount + Game.Objects['Prism'].amount + Game.Objects['Chancemaker'].amount + Game.Objects['Fractal engine'].amount >= 3000) Game.Win('Owner of Buildings') },
      () => { if (Game.Objects['Cursor'].amount + Game.Objects['Grandma'].amount + Game.Objects['Farm'].amount + Game.Objects['Factory'].amount + Game.Objects['Mine'].amount + Game.Objects['Bank'].amount + Game.Objects['Temple'].amount + Game.Objects['Wizard tower'].amount + Game.Objects['Shipment'].amount + Game.Objects['Alchemy lab'].amount + Game.Objects['Portal'].amount + Game.Objects['Time machine'].amount + Game.Objects['Antimatter condenser'].amount + Game.Objects['Prism'].amount + Game.Objects['Chancemaker'].amount + Game.Objects['Fractal engine'].amount >= 4000) Game.Win('Build up') },
      () => { if (Game.Objects['Cursor'].amount + Game.Objects['Grandma'].amount + Game.Objects['Farm'].amount + Game.Objects['Factory'].amount + Game.Objects['Mine'].amount + Game.Objects['Bank'].amount + Game.Objects['Temple'].amount + Game.Objects['Wizard tower'].amount + Game.Objects['Shipment'].amount + Game.Objects['Alchemy lab'].amount + Game.Objects['Portal'].amount + Game.Objects['Time machine'].amount + Game.Objects['Antimatter condenser'].amount + Game.Objects['Prism'].amount + Game.Objects['Chancemaker'].amount + Game.Objects['Fractal engine'].amount >= 5000) Game.Win('World-dominating company') },
      () => { if (Game.Objects['Cursor'].amount + Game.Objects['Grandma'].amount + Game.Objects['Farm'].amount + Game.Objects['Factory'].amount + Game.Objects['Mine'].amount + Game.Objects['Bank'].amount + Game.Objects['Temple'].amount + Game.Objects['Wizard tower'].amount + Game.Objects['Shipment'].amount + Game.Objects['Alchemy lab'].amount + Game.Objects['Portal'].amount + Game.Objects['Time machine'].amount + Game.Objects['Antimatter condenser'].amount + Game.Objects['Prism'].amount + Game.Objects['Chancemaker'].amount + Game.Objects['Fractal engine'].amount >= 6000) Game.Win('Creator of the Cookieverse') },
      () => { if (Game.Objects['Cursor'].amount + Game.Objects['Grandma'].amount + Game.Objects['Farm'].amount + Game.Objects['Factory'].amount + Game.Objects['Mine'].amount + Game.Objects['Bank'].amount + Game.Objects['Temple'].amount + Game.Objects['Wizard tower'].amount + Game.Objects['Shipment'].amount + Game.Objects['Alchemy lab'].amount + Game.Objects['Portal'].amount + Game.Objects['Time machine'].amount + Game.Objects['Antimatter condenser'].amount + Game.Objects['Prism'].amount + Game.Objects['Chancemaker'].amount + Game.Objects['Fractal engine'].amount >= 7000) Game.Win('Build until you can\'t build anymore') },
      () => { if (Game.Objects['Cursor'].amount + Game.Objects['Grandma'].amount + Game.Objects['Farm'].amount + Game.Objects['Factory'].amount + Game.Objects['Mine'].amount + Game.Objects['Bank'].amount + Game.Objects['Temple'].amount + Game.Objects['Wizard tower'].amount + Game.Objects['Shipment'].amount + Game.Objects['Alchemy lab'].amount + Game.Objects['Portal'].amount + Game.Objects['Time machine'].amount + Game.Objects['Antimatter condenser'].amount + Game.Objects['Prism'].amount + Game.Objects['Chancemaker'].amount + Game.Objects['Fractal engine'].amount >= 8000) Game.Win('You built the guilt') },
      () => { if (Game.UpgradesOwned >= 300) Game.Win('Purchaser of Upgrades') },
      () => { if (Game.UpgradesOwned >= 400) Game.Win('Grade up') },
      () => { if (Game.Objects['Cursor'].amount && Game.Objects['Grandma'].amount && Game.Objects['Farm'].amount && Game.Objects['Factory'].amount && Game.Objects['Mine'].amount && Game.Objects['Bank'].amount && Game.Objects['Temple'].amount && Game.Objects['Wizard tower'].amount && Game.Objects['Shipment'].amount && Game.Objects['Alchemy lab'].amount && Game.Objects['Portal'].amount && Game.Objects['Time machine'].amount && Game.Objects['Antimatter condenser'].amount && Game.Objects['Prism'].amount && Game.Objects['Chancemaker'].amount && Game.Objects['Fractal engine'].amount >= 550) Game.Win('Quincentennial and a half') },
      () => { if (Game.cookieClicks >= 1000) Game.Win('Clicker') },
      () => { if (Game.cookieClicks >= 10000) Game.Win('Advanced Clicker') },
      () => { if (Game.cookieClicks >= 25000) Game.Win('Expert Clicker') },
      () => { if (Game.prestige >= 100) Game.Win('Heavenly') },
      () => { if (Game.prestige >= 10000) Game.Win('Transcendent') },
      () => { if (Game.prestige >= 1000000) Game.Win('Higher energy state') },
      () => { if (Game.prestige >= 100000000) Game.Win('Omniverse') },
      () => { if (Game.prestige >= 10000000000) Game.Win('The Ascendant') },
      () => { if (Game.Has('Lucky digit') && Game.Has('Lucky number') && Game.Has('Lucky payout')) Game.Win('Secret fortune') },
      () => { if (Game.Has('Caramoas') && Game.Has('Sagalongs') && Game.Has('Shortfoils') && Game.Has('Win mints') && Game.Has('Fig gluttons') && Game.Has('Loreols') && Game.Has('Jaffa cakes') && Game.Has('Grease\'s cups') && Game.Has('Digits') && Game.Has('Bastenaken cookies') && Game.Has('Festivity loops')) Game.Win('You wanna be popular?') },
      () => { if (Game.Has('Rose macarons') && Game.Has('Lemon macarons') && Game.Has('Chocolate macarons') && Game.Has('Pistachio macarons') && Game.Has('Hazelnut macarons') && Game.Has('Violet macarons') && Game.Has('Caramel macarons') && Game.Has('Licorice macarons')) Game.Win('Emmanuel Macaron') },
      () => { if (Game.Has('British tea biscuits') && Game.Has('Chocolate british tea biscuits') && Game.Has('Round british tea biscuits') && Game.Has('Round chocolate british tea biscuits') && Game.Has('Round british tea biscuits with heart motif') && Game.Has('Round chocolate british tea biscuits with heart motif')) Game.Win('Getting fancy') },
      () => { if (Game.Has('Butter horseshoes') && Game.Has('Butter pucks') && Game.Has('Butter knots') && Game.Has('Butter slabs') && Game.Has('Butter swirls')) Game.Win('Rich butterfingers') },
      () => { if (Game.Has('Profiteroles') && Game.Has('Jelly donut') && Game.Has('Glazed donut') && Game.Has('Chocolate cake') && Game.Has('Strawberry cake') && Game.Has('Apple pie') && Game.Has('Lemon meringue pie') && Game.Has('Butter croissant')) Game.Win('Pastries from the past') },
      () => { if (Game.Has('Cookie dough') && Game.Has('Burnt cookie') && Game.Has('A chocolate chip cookie but with the chips picked off for some reason') && Game.Has('Flavor text cookie') && Game.Has('High-definition cookie')) Game.Win('Bake me, maybe?') },
      () => { if (Game.Has('Toast') && Game.Has('Peanut butter & jelly') && Game.Has('Wookies') && Game.Has('Cheeseburger') && Game.Has('One lone chocolate chip')) Game.Win('Burger Clicker') },
      () => { if (Game.Has('Elderwort biscuits') && Game.Has('Bakeberry cookies') && Game.Has('Wheat slims') && Game.Has('Duketater cookies') && Game.Has('Green yeast digestives') && Game.Has('Fern tea') && Game.Has('Ichor syrup')) Game.Win('Collecting these is like growing plants') },
      () => { if (Game.Objects['Cursor'].level && Game.Objects['Grandma'].level && Game.Objects['Farm'].level && Game.Objects['Factory'].level && Game.Objects['Mine'].level && Game.Objects['Bank'].level && Game.Objects['Temple'].level && Game.Objects['Wizard tower'].level && Game.Objects['Shipment'].level && Game.Objects['Alchemy lab'].level && Game.Objects['Portal'].level && Game.Objects['Time machine'].level && Game.Objects['Antimatter condenser'].level && Game.Objects['Prism'].level && Game.Objects['Chancemaker'] && Game.Objects['Fractal engine'].level >= 1) Game.Win('Level 1 complete!') },
      () => { if (Game.Objects['Cursor'].level && Game.Objects['Grandma'].level && Game.Objects['Farm'].level && Game.Objects['Factory'].level && Game.Objects['Mine'].level && Game.Objects['Bank'].level && Game.Objects['Temple'].level && Game.Objects['Wizard tower'].level && Game.Objects['Shipment'].level && Game.Objects['Alchemy lab'].level && Game.Objects['Portal'].level && Game.Objects['Time machine'].level && Game.Objects['Antimatter condenser'].level && Game.Objects['Prism'].level && Game.Objects['Chancemaker'] && Game.Objects['Fractal engine'].level >= 5) Game.Win('Five Hive') },
      () => { if (Darky.prestigeUpgradesOwned >= 15) Game.Win('Pretty prestige') },
      () => { if (Darky.prestigeUpgradesOwned >= 30) Game.Win('Live and learn') },
      () => { if (Darky.prestigeUpgradesOwned >= 60) Game.Win('We will stay with you forever') },
      () => { if (Game.Has('Kitten helpers') && Game.Has('Kitten workers') && Game.Has('Kitten engineers') && Game.Has('Kitten overseers') && Game.Has('Kitten managers') && Game.Has('Kitten accountants') && Game.Has('Kitten specialists') && Game.Has('Kitten experts') && Game.Has('Kitten consultants') && Game.Has('Kitten assistants to the regional manager') && Game.Has('Kitten marketeers') && Game.Has('Kitten analysts')) Game.Win('Purrfect Perfection') },
      () => { if (Game.Has('Future almanacs') && Game.Has('Seismic magic') && Game.Has('Quantum electronics') && Game.Has('Contracts from beyond') && Game.Has('Paganism') && Game.Has('Arcane knowledge') && Game.Has('Fossil fuels') && Game.Has('Primordial ores') && Game.Has('Infernal crops') && Game.Has('Relativistic parsec-skipping') && Game.Has('Extra physics funding') && Game.Has('Light magic') && Game.Has('Gemmed talismans') && Game.Has('Recursive mirrors')) Game.Win('It\'s sweet, sweet, sweet Synergy') },
      () => { if (Game.Has('Rain prayer') && Game.Has('Asteroid mining') && Game.Has('Temporal overclocking') && Game.Has('Printing presses') && Game.Has('God particle') && Game.Has('Magical botany') && Game.Has('Shipyards') && Game.Has('Gold fund') && Game.Has('Abysmal glimmer') && Game.Has('Primeval glow') && Game.Has('Chemical proficiency') && Game.Has('Mystical energies') && Game.Has('Charm quarks') && Game.Has('Mice clicking mice')) Game.Win('Out of Energy? Get Synergy!') },

      () => { if (Game.goldenClicks >= 77777) Game.Win('Golden Jackpot') },
      () => { if (name == 'darky') Game.Win('Mod-God complex') },
      () => { if (Game.heralds >= 10) Game.Win('I like playing supportive characters') },
      () => { if (Game.heralds >= 25) Game.Win('That\'s a lot of money') },
      () => { if (Game.heralds >= 50) Game.Win('You really want us to make games for you, huh?') },
      () => { if (Game.heralds >= 100) Game.Win('Thank you guys so much!') },
    ]

    //-------------------------------------------------------------------

    Game.HardResetBack = Game.HardReset;
    Game.HardReset = function (bypass) {
      Game.HardResetBack(bypass);
      if (bypass == 2) DarkySaveDefault();
    }

    DarkyLoadConfig();

    //-------------------------------------------------------------------

    Game.Win('Third-party')
    Game.Notify('Darky\'s Achievement Package', '<b>61</b> new Achievements have been added, enjoy and thank you for using my mod!', [17, 26, 'https://i.imgur.com/3jNJJNw.png']); PlaySound('https://s1.vocaroo.com/media/download_temp/Vocaroo_s1ZLVnMG4aI7.mp3');

  }

  var checkReady = setInterval(function() {
    if (Game && typeof Game.ready !== 'undefined' && Game.ready) {
      clearInterval(checkReady);
      main();
    }
  }, 1000);

})();