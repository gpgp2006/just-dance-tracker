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

        //Músicas do JD 2017
        await createSongHelper('CakeByTheOcean', 'Cake By The Ocean', 'DNCE', 2017);
        await createSongHelper('CheapThrills', 'Cheap Thrills', 'Sia ft. Sean Paul', 2017);
        await createSongHelper('Daddy', 'DADDY', 'PSY ft. CL of 2NE1', 2017);


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