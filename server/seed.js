const { sequelize, Game, Song, User, Score } = require('./models');

const createSongHelper = async (id, title, artist, edition) => {
    const imagePath = `/images/songs/${edition}/${id}.webp`;
    
    await Song.create({
        id: id,
        title: title,
        artist: artist,
        game_edition: edition,
        cover_image: imagePath
    });
};

const seed = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Tabelas limpas e recriadas');

        const edicoes = [1, 2, 3, 4, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]

        for (const edition of edicoes) {
            await Game.create({
                edition,
                title: `Just Dance ${edition}`,
                cover_image: `/images/games/${edition}.webp`
            });
        }
        console.log('Jogos criados');
        
        // Músicas do JD 1
        await createSongHelper('GirlsFun', 'Girls Just Want to Have Fun', 'Cyndi Lauper', 1);
        await createSongHelper('Ring', 'Ring My Bell', 'Anita Ward', 1);
        await createSongHelper('Conversation', 'A Little Less Conversation (JXL Radio Edit Remix)', 'Elvis Presley vs. JXL', 1);
        await createSongHelper('Cotton', 'Cotton Eye Joe', 'Rednex', 1);
        await createSongHelper('SurfinBird', 'Surfin’ Bird', 'The Trashmen', 1);
        await createSongHelper('Heart', 'Heart of Glass', 'Blondie', 1);
        await createSongHelper('Womanizer', 'Womanizer', 'Britney Spears(The Gym All-Stars)', 1);
        await createSongHelper('Delite', 'Groove Is in the Heart', 'Deee-Lite', 1);
        await createSongHelper('JerkItOut', 'Jerk It Out', 'Caesars', 1);
        await createSongHelper('MoveIt', 'I Like to Move It (Radio Mix)', 'Reel 2 Real feat. The Mad Stuntman', 1);
        await createSongHelper('HotNCold', 'Hot N Cold', 'Katy Perry', 1);
        await createSongHelper('Potato', 'Mashed Potato Time', 'Dee Dee Sharp', 1);
        await createSongHelper('GirlsBoys', 'Girls & Boys', 'Blur', 1);
        await createSongHelper('Fame', 'Fame', 'Irene Cara(In The Style of Irene Cara)', 1);
        await createSongHelper('Lump', 'Lump', 'The Presidents of the United States of America', 1);
        await createSongHelper('Kids', 'Kids in America', 'Kim Wilde', 1);
        await createSongHelper('Pump', 'Pump Up the Jam', 'Technotronic', 1);
        await createSongHelper('GetAround', 'I Get Around', 'The Beach Boys', 1);
        await createSongHelper('Freak', 'Le Freak', 'Chic', 1);
        await createSongHelper('ThatsTheWay', 'That’s the Way (I Like It)', 'KC and the Sunshine Band', 1);
        await createSongHelper('Louie', 'Louie Louie', 'Iggy Pop', 1);
        await createSongHelper('Funplex', 'Funplex (CSS Remix)', 'The B-52\'s', 1);
        await createSongHelper('JinGoLoBa', 'Jin Go Lo Ba', 'Fatboy Slim', 1);
        await createSongHelper('Dare', 'Dare', 'Gorillaz', 1);
        await createSongHelper('Bebe', 'Bebe', 'Divine Brown', 1);
        await createSongHelper('Eye', 'Eye of the Tiger', 'Survivor', 1);
        await createSongHelper('CantGetYou', 'Can’t Get You Out of My Head', 'Kylie Minogue', 1);
        await createSongHelper('Acceptable', 'Acceptable in the 80s', 'Calvin Harris', 1);
        await createSongHelper('DogsOut', 'Who Let the Dogs Out?', 'Baha Men', 1);
        await createSongHelper('Wannabe', 'Wannabe', 'Spice Girls', 1);
        await createSongHelper('Stepbystep', 'Step by Step', 'New Kids on the Block', 1);
        await createSongHelper('UCanttouch', 'U Can’t Touch This', 'MC Hammer', 1);


        // Músicas do JD 2
        await createSongHelper('ItsRainingMen', 'It’s Raining Men', 'The Weather Girls', 2);
        await createSongHelper('TikTok', 'TiK ToK', 'Kesha', 2);
        await createSongHelper('APunk', 'A-Punk', 'Vampire Weekend', 2);
        await createSongHelper('IGotYou', 'I Got You (I Feel Good)', 'James Brown', 2);
        await createSongHelper('WhenIGrowUp', 'When I Grow Up', 'The Pussycat Dolls', 2);
        await createSongHelper('Toxic', 'Toxic', 'Britney Spears(The Hit Crew)', 2);
        await createSongHelper('Idealistic', 'Idealistic', 'Digitalism', 2);
        await createSongHelper('GirlFriend', 'Girlfriend', 'Avril Lavigne', 2);
        await createSongHelper('SOS', 'S.O.S.', 'Rihanna', 2);
        await createSongHelper('ElectroTribal', 'Dagomba', 'Sorcerer', 2);
        await createSongHelper('MoveYourFeet', 'Move Your Feet', 'Junior Senior', 2);
        await createSongHelper('ProudMary', 'Proud Mary', 'Ike and Tina Turner', 2);
        await createSongHelper('HotStuff', 'Hot Stuff', 'Donna Summer', 2);
        await createSongHelper('BigGirl', 'Big Girl (You Are Beautiful)', 'MIKA', 2);
        await createSongHelper('IWantYouBack', 'I Want You Back', 'The Jackson 5', 2);
        await createSongHelper('IkoIko', 'Iko Iko', 'Mardi Gras', 2);
        await createSongHelper('Bollywood', 'Katti Kalandal', 'Bollywood', 2);
        await createSongHelper('Holiday', 'Holiday', 'Madonna(The Hit Crew)', 2);
        await createSongHelper('CallMe', 'Call Me', 'Blondie', 2);
        await createSongHelper('Sway', 'Sway (Quién Será)', 'Michael Bublé(Marine Band)', 2);
        await createSongHelper('Satisfaction', 'Satisfaction (Isak Original Extended)', 'Benny Benassi presents "The Biz"', 2);
        await createSongHelper('HeyYa', 'Hey Ya!', 'Outkast', 2);
        await createSongHelper('MugsyBaloney', 'Mugsy Baloney', 'Gert Wilden (Charleston)', 2);
        await createSongHelper('BabyGirl', 'Baby Girl', 'Reggaeton', 2);
        await createSongHelper('JungleBoogie', 'Jungle Boogie', 'Kool & the Gang(Studio Musicians)', 2);
        await createSongHelper('CrazyInLove', 'Crazy in Love', 'Beyoncé ft. Jay-Z(Studio Musicians)', 2);
        await createSongHelper('SoulBossaNova', 'Soul Bossa Nova', 'Quincy Jones and His Orchestra', 2);
        await createSongHelper('Dance', 'D.A.N.C.E.', 'Justice', 2);
        await createSongHelper('SympathyDevil', 'Sympathy for the Devil(Fatboy Slim Remix)', 'The Rolling Stones', 2);
        await createSongHelper('Rasputin', 'Rasputin', 'Boney M.', 2);
        await createSongHelper('JumpInTheLine', 'Jump in the Line', 'Harry Belafonte', 2);
        await createSongHelper('WakeMeUp', 'Wake Me Up Before You Go-Go', 'Wham!', 2);
        await createSongHelper('WalkLike', 'Walk Like an Egyptian', 'The Bangles', 2);
        await createSongHelper('Power', 'The Power', 'Snap!', 2);
        await createSongHelper('Jump', 'Jump', 'Kris Kross(Studio Allstars)', 2);
        await createSongHelper('MonsterMash', 'Monster Mash', 'Boris Pickett and The Crypt Kickers(The Frighteners)', 2);
        await createSongHelper('TakeMeOut', 'Take Me Out', 'Franz Ferdinand', 2);
        await createSongHelper('ThatsNotMyName', 'That’s Not My Name', 'The Ting Tings', 2);
        await createSongHelper('ShoopShoop', 'The Shoop Shoop Song (It’s in His Kiss)', 'Cher', 2);
        await createSongHelper('CosmicGirl', 'Cosmic Girl', 'Jamiroquai', 2);
        await createSongHelper('BodyMoving', 'Body Movin’ (Fatboy Slim Remix)', 'Beastie Boys', 2);
        await createSongHelper('VivaLasVegas', 'Viva Las Vegas', 'Elvis Presley', 2);
        await createSongHelper('Alright', 'Alright', 'Supergrass', 2);
        await createSongHelper('Rockafeller', 'Rockafeller Skank', 'Fatboy Slim', 2);
        await createSongHelper('ShouldIStay', 'Should I Stay or Should I Go', 'The Clash', 2);
        await createSongHelper('FunkyTown', 'Funkytown', 'Lipps Inc.(Sweat Invaders)', 2);
        await createSongHelper('JaiHo', 'Jai Ho (You Are My Destiny)', 'A. R. Rahman and The Pussycat Dolls ft. Nicole Scherzinger', 2);

        // Músicas do JD 3
        await createSongHelper('CaliforniaGurls', 'California Gurls', 'Katy Perry featuring Snoop Dogg', 3);
        await createSongHelper('TakeOnMe', 'Take On Me', 'a-ha', 3);
        await createSongHelper('PumpIt', 'Pump It', 'The Black Eyed Peas', 3);
        await createSongHelper('Lollipop', 'Lollipop', 'MIKA', 3);
        await createSongHelper('Promiscuous', 'Promiscuous', 'Nelly Furtado featuring Timbaland', 3);
        await createSongHelper('BabyOneMoreQUAT', 'Baby One More Time', 'Britney Spears(The Girly Team)', 3);
        await createSongHelper('PriceTag', 'Price Tag', 'Jessie J featuring B.o.B.', 3);
        await createSongHelper('FeelLikeDancing', 'I Don’t Feel Like Dancin’', 'Scissor Sisters', 3);
        await createSongHelper('MarciaBaila', 'Marcia Baila', 'Les Rita Mitsouko', 3);
        await createSongHelper('BarbraStreisand', 'Barbra Streisand', 'Duck Sauce', 3);
        await createSongHelper('VenusB', 'Venus', 'Bananarama', 3);
        await createSongHelper('NoLimit', 'No Limit', '2 Unlimited', 3);
        await createSongHelper('DynamiteQUAT', 'Dynamite', 'Taio Cruz', 3);
        await createSongHelper('TeenageDream', 'Teenage Dream', 'Katy Perry', 3);
        await createSongHelper('OnlyGirl', 'Only Girl (In The World)', 'Rihanna', 3);
        await createSongHelper('ForgetYou', 'Forget You', 'CeeLo Green', 3);
        await createSongHelper('JumpGA', 'Jump (For My Love)', 'Girls Aloud', 3);
        await createSongHelper('GonnaMake', 'Gonna Make You Sweat (Everybody Dance Now)', 'C+C Music Factory feat. Freedom Williams(Sweat Invaders)', 3);
        await createSongHelper('WhatYouWait', 'What You Waiting For?', 'Gwen Stefani', 3);
        await createSongHelper('CrazyLittle', 'Crazy Little Thing Called Love', 'Queen', 3);
        await createSongHelper('Think', 'Think', 'Aretha Franklin(The London Theatre Orchestra & Cast)', 3);
        await createSongHelper('BoogieWonderQUAT', 'Boogie Wonderland', 'Earth, Wind & Fire feat. The Emotions(Groove Century)', 3);
        await createSongHelper('HeyBoy', 'Hey Boy Hey Girl', 'The Chemical Brothers', 3);
        await createSongHelper('ET', 'E.T.', 'Katy Perry', 3);
        await createSongHelper('Boom', 'Boom', 'MC Magico and Alex Wilson(Reggaeton Storm)', 3);
        await createSongHelper('DaFunk', 'Da Funk', 'Daft Punk', 3);
        await createSongHelper('IFeelLove', 'I Feel Love', 'Donna Summer', 3);
        await createSongHelper('GiveMeMore', 'Dance All Nite', 'Anja', 3);
        await createSongHelper('SpectronizerQUAT', 'Spectronizer', 'Sentai Express', 3);
        await createSongHelper('PartyRock', 'Party Rock Anthem', 'LMFAO featuring Lauren Bennett and GoonRock', 3);
        await createSongHelper('GonnaGoMyWay', 'Are You Gonna Go My Way', 'Lenny Kravitz', 3);
        await createSongHelper('lo1000', 'Land Of 1000 Dances', 'Wilson Pickett', 3);
        await createSongHelper('GotMeDancing', 'She’s Got Me Dancing', 'Tommy Sparks', 3);
        await createSongHelper('JamaicanDance', 'Jamaican Dance', 'Konshens', 3);
        await createSongHelper('ToTheMall', 'Let\'s Go To The Mall', 'Cobie Smulders(as Robin Sparkles)', 3);
        await createSongHelper('NightBoatQUAT', 'Night Boat To Cairo', 'Madness', 3);
        await createSongHelper('SoExcited', 'I\'m So Excited', 'The Pointer Sisters', 3);
        await createSongHelper('VideoKilled', 'Video Killed the Radio Star', 'The Buggles', 3);
        await createSongHelper('Kurio', 'Kurio ko uddah le jana', 'Lata Mangeshkar and S. P. Balasubrahmanyam (Bollywood Rainbow)', 3);
        await createSongHelper('GiddyOnUp', 'Giddy on Up (Giddy on Out)', 'Laura Bell Bundy', 3);
        await createSongHelper('IWasMadeQUAT', 'I Was Made For Lovin\' You', 'Kiss', 3);
        await createSongHelper('TightRope', 'Tightrope (Solo Version)', 'Janelle Monae', 3);
        await createSongHelper('Airplanes', 'Airplanes', 'B.o.B. ft. Hayley Williams of Paramore', 3);
        await createSongHelper('BeautifulLiar', 'Beautiful Liar', 'Beyoncé and Shakira(Countdown Mix Masters)', 3);
        await createSongHelper('Apache', 'Apache (Jump On It)', 'The Sugarhill Gang', 3);
        await createSongHelper('PataPata', 'Pata Pata', 'Miriam Makeba(African Ladies)', 3);
        await createSongHelper('Satellite', 'Satellite', 'Lena Meyer-Landrut', 3);
        await createSongHelper('SomethinStupid', 'Somethin’ Stupid', 'Robbie Williams and Nicole Kidman', 3);
        await createSongHelper('HalloweenQUAT', 'This is Halloween', 'Danny Elfman', 3);
        await createSongHelper('JamboMambo', 'Jambo Mambo', 'Ole Orquesta', 3);
        await createSongHelper('BabyDontStop', 'Baby Don’t Stop Now', 'Anja', 3);
        await createSongHelper('TwistShakeAss', 'Twist and Shake It', 'Ben Wheeler and Tara Chinn(The Girly Team)', 3);
        await createSongHelper('SoulSearch', 'Soul Searchin’', 'Groove Century', 3);

        // Músicas do JD 4
        await createSongHelper('CallMeMaybe', 'Call Me Maybe', 'Carly Rae Jepsen', 4);
        await createSongHelper('GoodFeeling', 'Good Feeling', 'Flo Rida', 4);
        await createSongHelper('RockLobster', 'Rock Lobster', 'The B-52’s', 4);
        await createSongHelper('Disturbia', 'Disturbia', 'Rihanna', 4);
        await createSongHelper('MakesYouBeautifulQUAT', 'What Makes You Beautiful', 'One Direction', 4);
        await createSongHelper('HotForMe', 'Hot For Me', 'A.K.A', 4);
        await createSongHelper('KetchupSong', 'Aserejé (The Ketchup Song)', 'Las Ketchup', 4);
        await createSongHelper('HitEmUp', 'Hit ’Em Up Style (Oops!)', 'Blu Cantrell', 4);
        await createSongHelper('Americano', 'We No Speak Americano', 'Yolanda Be Cool and DCUP (Hit The Electro Beat)', 4);
        await createSongHelper('IDidItAgainQUAT', 'Oops!... I Did It Again', 'Britney Spears (The Girly Team)', 4);
        await createSongHelper('BeautyAndABeat', 'Beauty And A Beat', 'Justin Bieber ft. Nicki Minaj', 4);
        await createSongHelper('EverybodyNeeds', 'Everybody Needs Somebody To Love', 'The Blues Brothers (Dancing Bros)', 4);
        await createSongHelper('SexyLittleThing', 'Crazy Little Thing', 'Anja', 4);
        await createSongHelper('SuperBass', 'Super Bass', 'Nicki Minaj', 4);
        await createSongHelper('TribalDance', 'Tribal Dance', '2 Unlimited', 4);
        await createSongHelper('OnTheFloor', 'On the Floor', 'Jennifer Lopez ft. Pitbull', 4);
        await createSongHelper('BewareOf', 'Beware of the Boys (Mundian To Bach Ke)', 'Panjabi MC', 4);
        await createSongHelper('NeverGonna', 'Never Gonna Give You Up', 'Rick Astley', 4);
        await createSongHelper('Maneater', 'Maneater', 'Nelly Furtado', 4);
        await createSongHelper('RunTheShow', 'Run The Show', 'Kat DeLuna ft. Busta Rhymes', 4);
        await createSongHelper('LivinLaVida', 'Livin’ La Vida Loca', 'Ricky Martin', 4);
        await createSongHelper('YouReTheFirst', 'You’re the First, the Last, My Everything', 'Barry White', 4);
        await createSongHelper('OhNo', 'Oh No!', 'Marina and the Diamonds', 4);
        await createSongHelper('ILikeItLike', 'I Like It', 'The Blackout Allstars', 4);
        await createSongHelper('LoveYouLike', 'Love You Like A Love Song', 'Selena Gomez and the Scene', 4);
        await createSongHelper('CrucifiedQUAT', 'Crucified', 'Army of Lovers', 4);
        await createSongHelper('MasQueNada', 'Mas Que Nada', 'Sergio Mendes ft. The Black Eyed Peas', 4);
        await createSongHelper('CatchinUp', 'Some Catchin’ Up To Do', 'Sammy', 4);
        await createSongHelper('TheFinalCountdown', 'The Final Countdown', 'Europe', 4);
        await createSongHelper('MrSaxobeat', 'Mr. Saxobeat', 'Alexandra Stan', 4);
        await createSongHelper('JailHouseQUAT', 'Jailhouse Rock', 'Elvis Presley', 4);
        await createSongHelper('MovesLikeJag', 'Moves Like Jagger', 'Maroon 5 ft. Christina Aguilera', 4);
        await createSongHelper('CantTakeMyEyes', 'Can’t Take My Eyes Off You', 'Frankie Valli (Boys Town Gang)', 4);
        await createSongHelper('MakeTheParty', 'Make The Party (Don’t Stop)', 'Bunny Beatz ft. Liquid', 4);
        await createSongHelper('WildWildWestQUAT', 'Wild Wild West', 'Will Smith', 4);
        await createSongHelper('SoWhat', 'So What', 'P!nk', 4);
        await createSongHelper('IstanbulQUAT', 'Istanbul (Not Constantinople)', 'They Might Be Giants', 4);
        await createSongHelper('Superstition', 'Superstition', 'Stevie Wonder', 4);
        await createSongHelper('TheTimeOfMyLife', '(I’ve Had) The Time Of My Life', 'Bill Medley and Jennifer Warnes', 4);
        await createSongHelper('RockNRoll', 'Rock n’ Roll (Will Take You to the Mountain)', 'Skrillex', 4);
        await createSongHelper('TimeWarpQUAT', 'Time Warp', 'The Rocky Horror Picture Show Cast (Halloween Thrills)', 4);
        await createSongHelper('YouMakeMeFeel', 'You Make Me Feel...', 'Cobra Starship ft. Sabi', 4);
        await createSongHelper('LetMeFeelYa', 'Brand New Start', 'Anja', 4);
        await createSongHelper('GoodGirl', 'Good Girl', 'Carrie Underwood', 4);
        await createSongHelper('Umbrella', 'Umbrella', 'Rihanna ft. Jay-Z', 4);
        await createSongHelper('Amore', 'Cercavo Amore', 'Emma', 4);
        await createSongHelper('Diggin', 'Diggin’ in the Dirt', 'Stefanie Heinzmann', 4);
        await createSongHelper('AintNoOtherMan', 'Ain’t No Other Man', 'Christina Aguilera (The Girly Team)', 4);
        await createSongHelper('Domino', 'Domino', 'Jessie J', 4);
        await createSongHelper('WantUBack', 'Want U Back', 'Cher Lloyd ft. Astro', 4);

        // Músicas do JD 2014
        await createSongHelper('KissYou', 'Kiss You', 'One Direction', 2014);
        await createSongHelper('JustDance', 'Just Dance', 'Lady Gaga Ft. Colby O’ Donis', 2014);
        await createSongHelper('CarelessWhisper', 'Careless Whisper', 'George Michael', 2014);
        await createSongHelper('Cmon', 'C’mon', 'Ke$ha', 2014);
        await createSongHelper('SheWolf', 'She Wolf (Falling to Pieces)', 'David Guetta Ft. Sia', 2014);
        await createSongHelper('WhatAFeeling', 'Flashdance... What A Feeling', 'Irene Cara(The Girly Team)', 2014);
        await createSongHelper('PrinceAli', 'Prince Ali', 'Robin Williams(Disney’s Aladdin)', 2014);
        await createSongHelper('GetLucky', 'Get Lucky', 'Daft Punk Ft. Pharrell Williams', 2014);
        await createSongHelper('Wild', 'Wild', 'Jessie J ft. Big Sean', 2014);
        await createSongHelper('Gentleman', 'Gentleman', 'PSY', 2014);
        await createSongHelper('BlurredLines', 'Blurred Lines', 'Robin Thicke ft. Pharrell Williams', 2014);
        await createSongHelper('Ghostbusters', 'Ghostbusters', 'Ray Parker Jr.', 2014);
        await createSongHelper('IWillSurvive', 'I Will Survive', 'Gloria Gaynor', 2014);
        await createSongHelper('ThatPower', '#thatPOWER', 'will.i.am Ft. Justin Bieber', 2014);
        await createSongHelper('Limbo', 'Limbo', 'Daddy Yankee', 2014);
        await createSongHelper('TheWay', 'The Way', 'Ariana Grande Ft. Mac Miller', 2014);
        await createSongHelper('PoundTheAlarm', 'Pound The Alarm', 'Nicki Minaj', 2014);
        await createSongHelper('LoveBoat', 'Love Boat', 'Jack Jones (Frankie Bostello)', 2014);
        await createSongHelper('Troublemaker', 'Troublemaker', 'Olly Murs Ft. Flo Rida', 2014);
        await createSongHelper('LimaGolf1', 'Applause', 'Lady Gaga', 2014);
        await createSongHelper('BlameIt', 'Blame It on the Boogie', 'Mick Jackson', 2014);
        await createSongHelper('FeelSoRight', 'Feel So Right', 'Imposs ft. Konshens', 2014);
        await createSongHelper('SummerTime', 'In the Summertime', 'Mungo Jerry', 2014);
        await createSongHelper('FineChina', 'Fine China', 'Chris Brown', 2014);
        await createSongHelper('Gigolo', 'Just A Gigolo', 'Louis Prima', 2014);
        await createSongHelper('WhereHaveYou', 'Where Have You Been', 'Rihanna', 2014);
        await createSongHelper('Maria', 'María', 'Ricky Martin', 2014);
        await createSongHelper('GimmeGimme', 'Gimme! Gimme! Gimme! (A Man After Midnight)', 'ABBA', 2014);
        await createSongHelper('Moskau', 'Moskau', 'Dschinghis Khan(Dancing Bros.)', 2014);
        await createSongHelper('FeelThisMoment', 'Feel This Moment', 'Pitbull Ft. Christina Aguilera', 2014);
        await createSongHelper('FollowTheLeader', 'Follow the Leader', 'Wisin & Yandel Ft. Jennifer Lopez', 2014);
        await createSongHelper('YMCA', 'Y.M.C.A.', 'Village People', 2014);
        await createSongHelper('TurnUpTheLove', 'Turn Up The Love', 'Far East Movement Ft. Cover Drive', 2014);
        await createSongHelper('CouldYouBeLoved', 'Could You Be Loved', 'Bob Marley', 2014);
        await createSongHelper('Starships', 'Starships', 'Nicki Minaj', 2014);
        await createSongHelper('Luftballons', '99 Luftballons', 'NENA (Rutschen Planeten)', 2014);
        await createSongHelper('Candy', 'Candy', 'Robbie Williams', 2014);
        await createSongHelper('IKissed', 'I Kissed a Girl', 'Katy Perry', 2014);
        await createSongHelper('Zagreb', 'Isidora', 'Bog Bog Orkestar', 2014);
        await createSongHelper('RichGirl', 'Rich Girl', 'Gwen Stefani Ft. Eve', 2014);
        await createSongHelper('ItsYou', 'It’s You', 'Duck Sauce', 2014);
        await createSongHelper('Aquarius', 'Aquarius/Let the Sunshine In', 'The 5th Dimension(The Sunlight Shakers)', 2014);
        await createSongHelper('Misunderstood', 'Miss Understood', 'Sammie', 2014);
        await createSongHelper('RobotRock', 'Nitro Bot', 'Sentai Express', 2014);
        await createSongHelper('OtherSide', 'The Other Side', 'Jason Derulo', 2014);
        await createSongHelper('Dancando', 'Dançando', 'Ivete Sangalo', 2014);
        await createSongHelper('Danse', 'Danse (Pop Version)', 'Tal', 2014);
        await createSongHelper('Alfonso', 'Alfonso Signorini (Eroe Nazionale)', 'Fedez', 2014)
        await createSongHelper('SafeAndSound', 'Safe And Sound', 'Capital Cities', 2014);
        await createSongHelper('WakingUp', 'Waking Up in Vegas', 'Katy Perry', 2014);

        // Músicas do JD 2015
        await createSongHelper('Problem', 'Problem', 'Ariana Grande ft. Iggy Azalea & Big Sean', 2015);
        await createSongHelper('Happy', 'Happy', 'Pharrell Williams', 2015);
        await createSongHelper('TheFox', 'The Fox (What Does The Fox Say?)', 'Ylvis', 2015);
        await createSongHelper('LoveMeAgain', 'Love Me Again', 'John Newman', 2015);
        await createSongHelper('DarkHorse', 'Dark Horse', 'Katy Perry', 2015);
        await createSongHelper('LoveIsAll', 'Love Is All', 'Roger Glover & the Butterfly Ball(The Sunlight Shakers)', 2015);
        await createSongHelper('BrokenHeart', 'Me And My Broken Heart', 'Rixton', 2015);
        await createSongHelper('ILoveIt', 'I Love It', 'Icona Pop ft. Charli XCX', 2015);
        await createSongHelper('Tetris', 'Tetris', 'Hirokazu Tanaka(Dancing Bros.)', 2015);
        await createSongHelper('WalkThisWay', 'Walk This Way', 'Run DMC & Aerosmith', 2015);
        await createSongHelper('EnglishVersion', 'Let It Go', 'Idina Menzel(Disney’s Frozen)', 2015);
        await createSongHelper('BuiltForThis', 'Built For This', 'Becky G', 2015);
        await createSongHelper('Bailando', 'Bailando', 'Enrique Iglesias ft. Descemer Bueno and Gente de Zona', 2015);
        await createSongHelper('Summer', 'Summer', 'Calvin Harris', 2015);
        await createSongHelper('DontWorry', 'Don’t Worry Be Happy', 'Bobby McFerrin(The Bench Men)', 2015);
        await createSongHelper('Macarena', 'Macarena', 'Los Del Rio(The Girly Team)', 2015);
        await createSongHelper('BlackWidow', 'Black Widow', 'Iggy Azalea ft. Rita Ora', 2015);
        await createSongHelper('NoMountain', 'Ain’t No Mountain High Enough', 'Marvin Gaye & Tammi Terrell', 2015);
        await createSongHelper('GetLow', 'Get Low', 'Dillon Francis ft. DJ Snake', 2015);
        await createSongHelper('Balance', 'Bang Bang', 'Jessie J ft. Ariana Grande & Nicki Minaj', 2015);
        await createSongHelper('Fatima', 'Fatima', 'Sylvain Lux & llan Abou(Cheb Salama)', 2015);
        await createSongHelper('HoldingOut', 'Holding Out for a Hero', 'Bonnie Tyler', 2015);
        await createSongHelper('Birthday', 'Birthday', 'Katy Perry', 2015);
        await createSongHelper('OnlyYou', 'Only You (And You Alone)', 'The Platters(Love Letter)', 2015);
        await createSongHelper('Diamonds', 'Diamonds', 'Rihanna', 2015);
        await createSongHelper('SoPerfect', 'She Looks So Perfect', '5 Seconds Of Summer', 2015);
        await createSongHelper('BollywoodXmas', 'XMas Tree', 'Bollywood Santa', 2015);
        await createSongHelper('BestSongEver', 'Best Song Ever', 'One Direction', 2015);
        await createSongHelper('BadRomance', 'Bad Romance', 'Lady Gaga', 2015);
        await createSongHelper('NeverCanSay', 'Never Can Say Goodbye', 'Gloria Gaynor', 2015);
        await createSongHelper('SpinMeRound', 'You Spin Me Round (Like a Record)', 'Dead or Alive', 2015);
        await createSongHelper('4x4', '4x4', 'Miley Cyrus', 2015);
        await createSongHelper('Sirtaki', 'Epic Sirtaki', 'The Bouzouki’s', 2015);
        await createSongHelper('ItsMyBirthday', 'It’s My Birthday', 'will.i.am ft. Cody Wise', 2015);
        await createSongHelper('Burn', 'Burn', 'Ellie Goulding', 2015);
        await createSongHelper('MahNa', 'Mahna Mahna', 'Piero Umiliani(Frankie Bostello)', 2015);
        await createSongHelper('Speedy', 'Speedy Gonzalez', 'David Dante (Los Pimientos Locos)', 2015);
        await createSongHelper('Mad', 'Maps', 'Maroon 5', 2015);
        await createSongHelper('OnMyMind', 'You’re On My Mind', 'Imposs ft. J. Perry', 2015);
        await createSongHelper('AddictedToYou', 'Addicted To You', 'Avicii', 2015);
        await createSongHelper('FindYou', 'Till I Find You', 'Austin Mahone', 2015);
        await createSongHelper('Papaoutai', 'Papaoutai', 'Stromae', 2015);
        await createSongHelper('FindYourMove', 'Movement is Happiness (Find Your Thing)', 'Avishay Goren & Yossi Cohen', 2015);

        // Músicas do JD 2016
        await createSongHelper('AboutThatBass', 'All About That Bass', 'Meghan Trainor', 2016);
        await createSongHelper('NoControl', 'No Control', 'One Direction', 2016);
        await createSongHelper('IGotAFeeling', 'I Gotta Feeling', 'The Black Eyed Peas', 2016);
        await createSongHelper('Fancy', 'Fancy', 'Iggy Azalea ft. Charli XCX', 2016);
        await createSongHelper('TheseBoots', 'These Boots Are Made For Walking', 'Nancy Sinatra(The Girly Team)', 2016);
        await createSongHelper('Animals', 'Animals', 'Martin Garrix', 2016);
        await createSongHelper('UptownFunk', 'Uptown Funk', 'Mark Ronson ft. Bruno Mars', 2016);
        await createSongHelper('AngryBirds', 'Balkan Blast Remix', 'Angry Birds', 2016);
        await createSongHelper('Heartbeat', 'Heartbeat Song', 'Kelly Clarkson', 2016);
        await createSongHelper('HeyMama', 'Hey Mama', 'David Guetta ft. Nicki Minaj, Bebe Rexha & Afrojack', 2016);
        await createSongHelper('LevanPolkka', 'Ievan Polkka', 'Hatsune Miku', 2016);
        await createSongHelper('TheChoice', 'The Choice Is Yours', 'Darius Dante Van Dijk', 2016);
        await createSongHelper('Fun', 'Fun', 'Pitbull ft. Chris Brown', 2016);
        await createSongHelper('WilliamTell', 'William Tell Overture', 'Rossini', 2016);
        await createSongHelper('Lights', 'Lights', 'Ellie Goulding', 2016);
        await createSongHelper('Chiwawa', 'Chiwawa', 'Wanko Ni Mero Mero', 2016);
        await createSongHelper('YouNeverCan', 'You Never Can Tell', 'Chuck Berry(A. Caveman & The Backseats)', 2016);
        await createSongHelper('BornThisWay', 'Born This Way', 'Lady Gaga', 2016);
        await createSongHelper('KaboomPow', 'Kaboom Pow', 'Nikki Yanofsky', 2016);
        await createSongHelper('WhenTheRain', 'When The Rain Begins To Fall', 'Jermaine Jackson and Pia Zadora(Sky Trucking)', 2016);
        await createSongHelper('Stargate', 'Same Old Love', 'Selena Gomez', 2016);
        await createSongHelper('Coolos', 'Cool For The Summer', 'Demi Lovato', 2016);
        await createSongHelper('WantToWantMe', 'Want To Want Me', 'Jason Derulo', 2016);
        await createSongHelper('UnderTheSea', 'Under the Sea', 'Samuel E. Wright(Disney’s "The Little Mermaid")', 2016);
        await createSongHelper('ThisIsHow', 'This Is How We Do', 'Katy Perry', 2016);
        await createSongHelper('HitTheRoad', 'Hit The Road Jack', 'Ray Charles(Charles Percy)', 2016);
        await createSongHelper('JuntoATi', 'Junto a Ti', 'Martina Stoessel & Lodovica Comello (Disney’s "Violetta")', 2016);
        await createSongHelper('Blame', 'Blame', 'Calvin Harris ft. John Newman', 2016);
        await createSongHelper('SaintPatrick', 'Irish Meadow Dance', 'O\'Callaghan’s Orchestra', 2016);
        await createSongHelper('Rabiosa', 'Rabiosa', 'Shakira ft. El Cata', 2016);
        await createSongHelper('Circus', 'Circus', 'Britney Spears', 2016);
        await createSongHelper('YoureTheOne', 'You’re The One That I Want', 'John Travolta & Olivia Newton-John(From The MovieGrease)', 2016);
        await createSongHelper('Hangover', 'Hangover (BaBaBa)', 'Buraka Som Sistema', 2016);
        await createSongHelper('Albatraoz', 'I’m An Albatraoz', 'AronChupa', 2016);
        await createSongHelper('KungFu', 'Kool Kontact', 'Glorious Black Belts', 2016);
        await createSongHelper('Teacher', 'Teacher', 'Nick Jonas', 2016);
        await createSongHelper('StuckOnAFeeling', 'Stuck On A Feeling', 'Prince Royce', 2016);
        await createSongHelper('BoysBoys', 'Boys (Summertime Love)', 'Sabrina Salerno (The Lemon Cubes)', 2016);
        await createSongHelper('ElectroMambo', 'Drop the Mambo', 'Diva Carmina', 2016);
        await createSongHelper('Gibberish', 'Gibberish', 'MAX', 2016);
        await createSongHelper('CopaCabana', 'Copacabana', 'Barry Manilow (Frankie Bostello)', 2016);
        await createSongHelper('LetsGroove', 'Let’s Groove', 'Earth, Wind & Fire (Equinox Stars)', 2016);
        await createSongHelper('StadiumFlow', 'Stadium Flow', 'Imposs', 2016);

        //Músicas do JD 2017
        await createSongHelper('CakeByTheOcean', 'Cake By The Ocean', 'DNCE', 2017);
        await createSongHelper('CheapThrills', 'Cheap Thrills', 'Sia ft. Sean Paul', 2017);
        await createSongHelper('Daddy', 'DADDY', 'PSY ft. CL of 2NE1', 2017);
        await createSongHelper('Sorry', 'Sorry', 'Justin Bieber', 2017);
        await createSongHelper('Hips', 'Hips Don’t Lie', 'Shakira ft. Wyclef Jean', 2017);
        await createSongHelper('September', 'September', 'Earth, Wind & Fire (Equinox Stars)', 2017);
        await createSongHelper('SingleLadies', 'Single Ladies (Put a Ring on It)', 'Beyoncé', 2017);
        await createSongHelper('DontStopMe', 'Don’t Stop Me Now', 'Queen', 2017);
        await createSongHelper('LeanOn', 'Lean On', 'Major Lazer & DJ Snake ft. MØ', 2017);
        await createSongHelper('CantFeelMyFace', 'Can’t Feel My Face', 'The Weeknd', 2017);
        await createSongHelper('PoPiPo', 'PoPiPo', 'Hatsune Miku', 2017);
        await createSongHelper('IntoYou', 'Into You', 'Ariana Grande', 2017);
        await createSongHelper('RedMangoose', 'Don’t Wanna Know', 'Maroon 5', 2017);
        await createSongHelper('Bang', 'Bang', 'Anitta', 2017);
        await createSongHelper('GhostInTheKeys', 'Ghost In The Keys', 'Halloween Thrills', 2017);
        await createSongHelper('Radical', 'RADICAL', 'Dyro & Dannic', 2017);
        await createSongHelper('Bicicleta', 'La Bicicleta', 'Carlos Vives & Shakira', 2017);
        await createSongHelper('LikeIWould', 'Like I Would', 'Zayn', 2017);
        await createSongHelper('WhereverIGo', 'Wherever I Go', 'OneRepublic', 2017);
        await createSongHelper('NaeNae', 'Watch Me (Whip/Nae Nae)', 'Silentó', 2017);
        await createSongHelper('ILoveRock', 'I Love Rock ‘N’ Roll', 'Joan Jett & The Blackhearts(Fast Forward Highway)', 2017);
        await createSongHelper('Bonbon', 'Bonbon', 'Era Istrefi', 2017);
        await createSongHelper('Groove', 'Groove', 'Jack & Jack', 2017);
        await createSongHelper('Oishii', 'Oishii Oishii', 'Wanko Ni Mero Mero', 2017);
        await createSongHelper('WorthIt', 'Worth It', 'Fifth Harmony ft. Kid Ink', 2017);
        await createSongHelper('LastChristmas', 'Last Christmas', 'Wham!(Santa Clones)', 2017);
        await createSongHelper('Samba', 'Carnaval Boom', 'Latino Sunset', 2017);
        await createSongHelper('AllAboutUs', 'All About Us', 'Jordan Fisher', 2017);
        await createSongHelper('Leila', 'Leila', 'Cheb Salama', 2017);
        await createSongHelper('ColaSong', 'Cola Song', 'INNA ft. J Balvin', 2017);
        await createSongHelper('LittleSwing', 'Little Swing', 'AronChupa ft. Little Sis Nora', 2017);
        await createSongHelper('RunTheNight', 'Run The Night', 'Gigi Rowe', 2017);
        await createSongHelper('DragosteaDinTei', 'Dragostea Din Tei', 'O-Zone', 2017);
        await createSongHelper('ScreamNShout', 'Scream & Shout', 'will.i.am ft. Britney Spears', 2017);
        await createSongHelper('TicoTico', 'Tico-Tico No Fubá', 'Zequinha de Abreu(The Frankie Bostello Orchestra)', 2017);
        await createSongHelper('Bailar', 'Bailar', 'Deorro ft. Elvis Crespo', 2017);
        await createSongHelper('Titanium', 'Titanium', 'David Guetta ft. Sia', 2017);
        await createSongHelper('TeDominar', 'Te Dominar', 'Daya Luz', 2017);
        await createSongHelper('WhatIsLove', 'What Is Love', 'Haddaway(Ultraclub 90)', 2017);
        await createSongHelper('ElTiki', 'El Tiki', 'Maluma', 2017);


        // Músicas do JD 2022
        await createSongHelper('Baiana', 'Baianá', 'Bakermat', 2022)
        await createSongHelper('Believer', 'Believer', 'Imagine Dragons', 2022)
        await createSongHelper('BlackMamALT', 'Black Mamba', 'aespa', 2022)

        
        console.log('Músicas criadas');

        const user = await User.create({ 
            username: 'Player1', 
            email: 'test@test.com', 
            password: '$2a$10$6js45HvHVEbOYeRwXLUEdubaPzBVcGXNxli9nJj1/xaTdGiAjY7kC', /* A senha é "123", mas está hasheada aqui */
        });

        await Score.create({
            user_id: user.id,
            song_id: 'CallMeMaybe', 
            score_points: 12500,
            stars: 5,
            platform: 'Wii U',
            input_method: 'Wiimote'
        });
        console.log('Pontuação criada');

        console.log('Dados inseridos com sucesso');
    } catch (error) {
        console.error('Erro:', error);
    } finally {
        await sequelize.close();
    }
};

seed();