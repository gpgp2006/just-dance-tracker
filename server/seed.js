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

        await Game.create({
            edition: 4,
            title: 'Just Dance 4',
            cover_image: '/images/games/4.webp'
        });

        await Game.create({
            edition: 2014,
            title: 'Just Dance 2014',
            cover_image: '/images/games/2014.webp'
        });

        await Game.create({
            edition: 2015,
            title: 'Just Dance 2015',
            cover_image: '/images/games/2015.webp'
        });

        await Game.create({
            edition: 2017,
            title: 'Just Dance 2017',
            cover_image: '/images/games/2017.webp'
        })

        await Game.create({
            edition: 2022,
            title: 'Just Dance 2022',
            cover_image: '/images/games/2022.webp'
        });
        console.log('Jogos criados');
        
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
        await createSongHelper('JustDance', 'Just Dance', 'Lady Gaga', 2014);
        await createSongHelper('CarelessWhisper', 'Careless Whisper', 'George Michael', 2014);

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