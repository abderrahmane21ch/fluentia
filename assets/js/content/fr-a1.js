/* French · A1 Débutant */
FL.addLevel('fr', {
  code: 'A1',
  name: 'Débutant',
  summary: 'Start speaking French: greetings, family, your daily routine, ordering at a café and finding your way around town.',
  outcome: 'By the end of A1 you can introduce yourself, talk about your family and routine, order food and ask for directions in simple French.',
  lessons: [
    {
      title: 'Bonjour ! Se présenter',
      focus: 'Le verbe être · tu ou vous',
      minutes: 20,
      goals: ['Greet people formally and informally', 'Introduce yourself and say your nationality', 'Conjugate être and make simple negatives and questions'],
      slides: [
        { t: 'table', title: 'Saluer', intro: 'French has a clear difference between **informal** (friends, family, children) and **formal** situations.',
          head: ['Informal — tu', 'Formal — vous'],
          rows: [['Salut !', 'Bonjour madame / monsieur.'], ['Ça va ?', 'Comment allez-vous ?'], ['Ça va bien, et toi ?', 'Très bien, merci. Et vous ?'], ['Salut ! À plus !', 'Au revoir. Bonne journée !']],
          note: '**Bonsoir** after about 6 pm. Use **vous** with strangers, at work and with more than one person.' },
        { t: 'table', title: 'Le verbe être (to be)', head: ['Pronoun', 'être', 'Example', 'English'],
          rows: [['je', 'suis', 'Je suis étudiant.', 'I am a student.'], ['tu', 'es', 'Tu es française ?', 'Are you French?'], ['il / elle / on', 'est', 'Elle est professeure.', 'She is a teacher.'], ['nous', 'sommes', 'Nous sommes amis.', 'We are friends.'], ['vous', 'êtes', 'Vous êtes d’où ?', 'Where are you from?'], ['ils / elles', 'sont', 'Ils sont en classe.', 'They are in class.']],
          note: '**on** is very common in speaking and means "we": On est en retard ! (We’re late!)' },
        { t: 'text', title: 'Négation et questions',
          body: ['**Negative** = **ne … pas** around the verb: Je **ne** suis **pas** fatigué. → *ne* becomes **n’** before a vowel: Elle **n’**est **pas** là.',
            '**Questions** — three ways:', '1. Intonation (spoken): Tu es étudiant ? ↗', '2. Est-ce que: **Est-ce que** tu es étudiant ?', '3. Inversion (formal): **Êtes-vous** étudiant ?'] },
        { t: 'dialogue', title: 'Le premier cours',
          lines: [['Le professeur', 'Bonjour ! Je m’appelle Monsieur Amar. Comment vous appelez-vous ?', 'Hello! My name is Mr Amar. What’s your name?'], ['Lina', 'Bonjour, je m’appelle Lina.', 'Hello, my name is Lina.'], ['Le professeur', 'Enchanté, Lina. Vous êtes d’où ?', 'Nice to meet you, Lina. Where are you from?'], ['Lina', 'Je suis malaisienne. Je suis de Kuala Lumpur.', 'I’m Malaysian. I’m from Kuala Lumpur.'], ['Le professeur', 'Vous êtes étudiante ?', 'Are you a student?'], ['Lina', 'Oui, je suis étudiante en architecture.', 'Yes, I’m an architecture student.'], ['Le professeur', 'Bienvenue dans le cours !', 'Welcome to the class!']] },
        { t: 'table', title: 'Les nationalités', intro: 'Most adjectives add **-e** for the feminine. Some double the final consonant.',
          head: ['Masculin', 'Féminin', 'English'],
          rows: [['français', 'française', 'French'], ['anglais', 'anglaise', 'English'], ['espagnol', 'espagnole', 'Spanish'], ['malaisien', 'malaisienne', 'Malaysian'], ['algérien', 'algérienne', 'Algerian'], ['belge', 'belge', 'Belgian (no change)']] }
      ],
      vocab: [['bonjour', 'hello / good morning'], ['au revoir', 'goodbye'], ['merci', 'thank you'], ['s’il vous plaît', 'please (formal)'], ['je m’appelle…', 'my name is…'], ['enchanté(e)', 'nice to meet you'], ['étudiant(e)', 'student'], ['professeur(e)', 'teacher']],
      practice: [
        ['choice', 'Nous ___ étudiants.', ['sommes', 'êtes', 'sont', 'est'], 'nous → sommes.'],
        ['choice', 'Which greeting is polite for a stranger?', ['Bonjour madame, comment allez-vous ?', 'Salut, ça va ?', 'Coucou !', 'À plus !'], 'With strangers, use "Bonjour" and "vous".'],
        ['gap', 'Elles ___ françaises.', ['sont'], 'ils / elles → sont.'],
        ['gap', 'Tu ___ de Paris ?', ['es'], 'tu → es.'],
        ['choice', 'Je ___ suis pas fatigué.', ['ne', 'n’', 'pas', 'non'], 'Negative: ne + verb + pas (ne before a consonant).'],
        ['match', 'Match French and English.', [['Bonjour', 'Hello'], ['Merci', 'Thank you'], ['Au revoir', 'Goodbye'], ['Enchanté', 'Nice to meet you'], ['S’il vous plaît', 'Please']]],
        ['choice', 'The feminine of "malaisien" is…', ['malaisienne', 'malaisiene', 'malaisiens', 'malaisiennes'], '-ien → -ienne (double n + e).'],
        ['order', 'Je suis étudiante en médecine.', 'I am a medical student.'],
        ['listen', 'Comment vous appelez-vous ?']
      ],
      summary: ['Tu for friends and family, vous for formal situations or several people.', 'Être: je suis, tu es, il est, nous sommes, vous êtes, ils sont.', 'Negative: ne…pas (n’ before a vowel). Questions: intonation, est-ce que, or inversion.']
    },
    {
      title: 'Ma famille',
      focus: 'Le verbe avoir · les adjectifs possessifs',
      minutes: 20,
      goals: ['Talk about your family members', 'Conjugate avoir and use it to say your age', 'Use mon / ma / mes and the other possessives'],
      slides: [
        { t: 'vocab', title: 'La famille', words: [['la mère / maman', 'mother / mum'], ['le père / papa', 'father / dad'], ['la sœur', 'sister'], ['le frère', 'brother'], ['les grands-parents', 'grandparents'], ['l’oncle / la tante', 'uncle / aunt'], ['le cousin / la cousine', 'cousin'], ['les enfants', 'children']] },
        { t: 'table', title: 'Le verbe avoir (to have)', head: ['Pronoun', 'avoir', 'Example', 'English'],
          rows: [['j’', 'ai', 'J’ai deux frères.', 'I have two brothers.'], ['tu', 'as', 'Tu as des enfants ?', 'Do you have children?'], ['il / elle', 'a', 'Elle a un chat.', 'She has a cat.'], ['nous', 'avons', 'Nous avons une voiture.', 'We have a car.'], ['vous', 'avez', 'Vous avez l’heure ?', 'Do you have the time?'], ['ils / elles', 'ont', 'Ils ont trois filles.', 'They have three daughters.']],
          note: 'In French, age uses **avoir**: J’**ai** vingt ans. (I am twenty.) ~~Je suis vingt ans~~' },
        { t: 'table', title: 'Les adjectifs possessifs', intro: 'The possessive agrees with the **noun** that follows (its gender and number), **not** with the owner.',
          head: ['', 'Masculine', 'Feminine', 'Plural'],
          rows: [['my', 'mon père', 'ma mère', 'mes parents'], ['your (tu)', 'ton frère', 'ta sœur', 'tes cousins'], ['his / her', 'son oncle', 'sa tante', 'ses enfants'], ['our', 'notre fils', 'notre fille', 'nos amis'], ['your (vous)', 'votre mari', 'votre femme', 'vos enfants'], ['their', 'leur père', 'leur mère', 'leurs parents']],
          note: 'Before a feminine noun starting with a vowel, use **mon / ton / son**: **mon** amie, **son** école.' },
        { t: 'examples', title: 'Écoutez et répétez', items: [['J’ai deux frères et une sœur.', 'I have two brothers and one sister.'], ['Ma mère s’appelle Fatima.', 'My mother’s name is Fatima.'], ['Mon père a cinquante ans.', 'My father is fifty.'], ['Nos grands-parents habitent à Oran.', 'Our grandparents live in Oran.'], ['Sara adore son père.', 'Sara loves her father.']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Je suis vingt ans.', 'J’ai vingt ans.', 'Age uses avoir.'], ['Ma amie s’appelle Inès.', 'Mon amie s’appelle Inès.', 'mon before a vowel, even for feminine nouns.'], ['Sara aime sa père.', 'Sara aime son père.', 'père is masculine → son (even if the owner is a woman).']] }
      ],
      vocab: [['les parents', 'parents (also: relatives)'], ['le mari', 'husband'], ['la femme', 'wife / woman'], ['le fils', 'son'], ['la fille', 'daughter / girl'], ['fils unique / fille unique', 'only child'], ['s’appeler', 'to be called'], ['habiter', 'to live (in a place)']],
      practice: [
        ['choice', 'J’___ trois cousins.', ['ai', 'a', 'as', 'avons'], 'je → ai (j’ai).'],
        ['choice', 'Sara aime ___ père.', ['son', 'sa', 'ses', 'leur'], 'père is masculine singular → son.'],
        ['gap', 'Nous ___ un chat. (avoir)', ['avons'], 'nous → avons.'],
        ['gap', 'Ils ___ deux enfants. (avoir)', ['ont'], 'ils → ont.'],
        ['choice', '___ amie s’appelle Inès.', ['Mon', 'Ma', 'Mes', 'M’'], 'Feminine noun starting with a vowel → mon.'],
        ['choice', 'How do you say "I am 30"?', ['J’ai trente ans.', 'Je suis trente ans.', 'J’ai trente.', 'Je suis trente années.'], 'Age: avoir + number + ans.'],
        ['match', 'Match French and English.', [['la mère', 'mother'], ['le frère', 'brother'], ['la tante', 'aunt'], ['le fils', 'son'], ['les grands-parents', 'grandparents']]],
        ['order', 'Mes parents habitent à Lyon.', 'My parents live in Lyon.'],
        ['listen', 'J’ai un frère et deux sœurs.']
      ],
      summary: ['Avoir: j’ai, tu as, il a, nous avons, vous avez, ils ont — also for age (J’ai 20 ans).', 'Possessives agree with the noun: mon père, ma mère, mes parents.', 'mon / ton / son before a vowel: mon amie.']
    },
    {
      title: 'Ma journée',
      focus: 'Verbes en -er · verbes pronominaux · l’heure',
      minutes: 25,
      goals: ['Describe your daily routine', 'Conjugate regular -er verbs and reflexive verbs', 'Tell the time in French'],
      slides: [
        { t: 'table', title: 'Les verbes en -er : parler', intro: 'About 90% of French verbs end in **-er**. Remove -er and add the endings.',
          head: ['Pronoun', 'parler', 'Ending'],
          rows: [['je', 'parle', '-e'], ['tu', 'parles', '-es'], ['il / elle / on', 'parle', '-e'], ['nous', 'parlons', '-ons'], ['vous', 'parlez', '-ez'], ['ils / elles', 'parlent', '-ent']],
          note: 'Good news: *parle, parles, parlent* are all **pronounced the same**! Same pattern: travailler, habiter, aimer, manger, regarder.' },
        { t: 'table', title: 'Les verbes pronominaux : se lever', intro: 'Many routine verbs are **reflexive**: they use a pronoun (me, te, se…) that matches the subject.',
          head: ['Pronoun', 'se lever', 'English'],
          rows: [['je', 'me lève', 'I get up'], ['tu', 'te lèves', 'you get up'], ['il / elle', 'se lève', 'he / she gets up'], ['nous', 'nous levons', 'we get up'], ['vous', 'vous levez', 'you get up'], ['ils / elles', 'se lèvent', 'they get up']],
          note: 'Others: se réveiller (wake up), se doucher (shower), s’habiller (get dressed), se coucher (go to bed).' },
        { t: 'table', title: 'Quelle heure est-il ?', head: ['Time', 'En français'],
          rows: [['8:00', 'Il est huit heures.'], ['8:15', 'Il est huit heures et quart.'], ['8:30', 'Il est huit heures et demie.'], ['8:45', 'Il est neuf heures moins le quart.'], ['12:00', 'Il est midi.'], ['00:00', 'Il est minuit.']],
          note: 'Use **à** for "at": Je commence **à** neuf heures. Timetables use the 24-hour clock: 18h30 = dix-huit heures trente.' },
        { t: 'examples', title: 'La journée de Camille', items: [['Je me réveille à sept heures.', 'I wake up at seven.'], ['Je prends le petit-déjeuner avec ma famille.', 'I have breakfast with my family.'], ['Je travaille de neuf heures à cinq heures.', 'I work from nine to five.'], ['Le soir, je regarde un film.', 'In the evening, I watch a film.'], ['Je me couche à onze heures.', 'I go to bed at eleven.']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Je lève à 7 heures.', 'Je me lève à 7 heures.', 'Don’t forget the reflexive pronoun.'], ['Nous parler français.', 'Nous parlons français.', 'Conjugate the verb: nous → -ons.'], ['Il est huit heures et demi.', 'Il est huit heures et demie.', 'demie agrees with heure (feminine).']] }
      ],
      vocab: [['se réveiller', 'to wake up'], ['se lever', 'to get up'], ['le petit-déjeuner', 'breakfast'], ['le déjeuner', 'lunch'], ['le dîner', 'dinner'], ['travailler', 'to work'], ['se coucher', 'to go to bed'], ['le soir', 'the evening']],
      practice: [
        ['gap', 'Vous ___ (parler) anglais ?', ['parlez'], 'vous → -ez.'],
        ['gap', 'Ils ___ (habiter) à Marseille.', ['habitent'], 'ils → -ent.'],
        ['choice', 'Je ___ lève à six heures.', ['me', 'se', 'te', 'le'], 'je → me.'],
        ['choice', 'Nous nous ___ tôt.', ['levons', 'levez', 'lève', 'lèvent'], 'nous → -ons.'],
        ['choice', 'How do you say 9:45?', ['dix heures moins le quart', 'neuf heures moins le quart', 'neuf heures et demie', 'dix heures et quart'], '9:45 = 10:00 minus a quarter.'],
        ['match', 'Match the times.', [['7h15', 'sept heures et quart'], ['7h30', 'sept heures et demie'], ['12h00', 'midi'], ['6h45', 'sept heures moins le quart']]],
        ['order', 'Elle se couche à onze heures.', 'She goes to bed at eleven.'],
        ['listen', 'Je travaille le lundi et le mardi.']
      ],
      summary: ['-er verbs: je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.', 'Reflexive verbs need me / te / se / nous / vous / se: je me lève.', 'Time: Il est huit heures et quart / et demie / moins le quart; à + time.']
    },
    {
      title: 'Au café',
      focus: 'Les articles · je voudrais · les nombres',
      minutes: 25,
      goals: ['Order food and drinks politely', 'Choose between un / le / du (indefinite, definite, partitive)', 'Understand prices and numbers up to 100'],
      slides: [
        { t: 'vocab', title: 'Au café', words: [['un café', 'a coffee'], ['un thé', 'a tea'], ['de l’eau', 'some water'], ['un croissant', 'a croissant'], ['du pain', 'some bread'], ['du fromage', 'some cheese'], ['une salade', 'a salad'], ['l’addition', 'the bill']] },
        { t: 'table', title: 'Les articles', head: ['', 'Masculine', 'Feminine', 'Plural'],
          rows: [['Indefinite (a / some)', 'un café', 'une salade', 'des croissants'], ['Definite (the / general)', 'le café', 'la salade', 'les croissants'], ['Partitive (some, an amount)', 'du pain', 'de la confiture', 'des pâtes']],
          note: 'Before a vowel: **l’**eau, **de l’**eau. After a negative, un / une / du / de la / des become **de**: Je n’ai **pas de** pain.' },
        { t: 'text', title: 'Which article?',
          body: ['Use **le / la / les** for likes and general ideas: J’aime **le** café. Je déteste **les** épinards.', 'Use **du / de la** for an unspecified amount: Je bois **du** café le matin. Elle mange **de la** soupe.',
            'Use **un / une** for one countable item: Je voudrais **un** croissant.', 'To order politely: **Je voudrais…** (I would like…) / **Pour moi, …** (For me, …)'] },
        { t: 'dialogue', title: 'Commander au café',
          lines: [['Le serveur', 'Bonjour ! Vous désirez ?', 'Hello! What would you like?'], ['La cliente', 'Bonjour. Je voudrais un café et un croissant, s’il vous plaît.', 'Hello. I’d like a coffee and a croissant, please.'], ['Le serveur', 'Avec du lait ?', 'With milk?'], ['La cliente', 'Non merci, sans lait. Et une bouteille d’eau, s’il vous plaît.', 'No thanks, without milk. And a bottle of water, please.'], ['Le serveur', 'Très bien. Ça fait six euros cinquante.', 'Very good. That’s six euros fifty.'], ['La cliente', 'Voilà. Merci, bonne journée !', 'Here you are. Thanks, have a nice day!']] },
        { t: 'table', title: 'Les nombres de 20 à 100', head: ['Number', 'French', 'Logic'],
          rows: [['20 / 30 / 40', 'vingt / trente / quarante', ''], ['50 / 60', 'cinquante / soixante', ''], ['70', 'soixante-dix', '60 + 10'], ['75', 'soixante-quinze', '60 + 15'], ['80', 'quatre-vingts', '4 × 20'], ['90', 'quatre-vingt-dix', '4 × 20 + 10'], ['100', 'cent', '']],
          note: 'In Belgium and Switzerland: **septante** (70) and **nonante** (90).' },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Je voudrais de le pain.', 'Je voudrais du pain.', 'de + le = du.'], ['Je n’ai pas du lait.', 'Je n’ai pas de lait.', 'After a negative → de.'], ['J’aime du chocolat.', 'J’aime le chocolat.', 'Likes and dislikes use le / la / les.']] }
      ],
      vocab: [['je voudrais', 'I would like'], ['Vous désirez ?', 'What would you like?'], ['ça fait…', 'that comes to…'], ['une bouteille de', 'a bottle of'], ['sans', 'without'], ['avec', 'with'], ['le serveur / la serveuse', 'waiter / waitress'], ['combien ?', 'how much? / how many?']],
      practice: [
        ['choice', 'Je voudrais ___ eau, s’il vous plaît.', ['de l’', 'du', 'de la', 'le'], 'Partitive before a vowel → de l’.'],
        ['choice', 'Je n’ai pas ___ sucre.', ['de', 'du', 'le', 'un'], 'After a negative → de.'],
        ['choice', 'J’adore ___ fromage.', ['le', 'du', 'un', 'de'], 'Likes → definite article.'],
        ['gap', 'Je voudrais ___ croissant, s’il vous plaît. (a)', ['un'], 'croissant is masculine → un.'],
        ['gap', 'Elle mange ___ soupe. (some — feminine, two words)', ['de la'], 'Partitive feminine → de la.'],
        ['choice', 'How do you say 80?', ['quatre-vingts', 'soixante-dix', 'quatre-vingt-dix', 'huit-dix'], '80 = 4 × 20 = quatre-vingts.'],
        ['match', 'Match French and English.', [['l’addition', 'the bill'], ['sans lait', 'without milk'], ['je voudrais', 'I would like'], ['ça fait', 'that comes to']]],
        ['order', 'Je voudrais un thé, s’il vous plaît.', 'I’d like a tea, please.'],
        ['listen', 'L’addition, s’il vous plaît.']
      ],
      summary: ['un / une = one item; le / la / les = likes and general ideas; du / de la / de l’ = some (an amount).', 'After a negative: pas de (Je n’ai pas de pain).', 'Order with "Je voudrais…, s’il vous plaît". 70 = soixante-dix, 80 = quatre-vingts, 90 = quatre-vingt-dix.']
    },
    {
      title: 'Ma ville',
      focus: 'Il y a · aller à · les prépositions de lieu',
      minutes: 25,
      goals: ['Describe your town and its places', 'Use aller + à (au, à la, aux)', 'Ask for and give simple directions'],
      slides: [
        { t: 'vocab', title: 'Les lieux de la ville', words: [['la gare', 'the train station'], ['la banque', 'the bank'], ['la pharmacie', 'the pharmacy'], ['le supermarché', 'the supermarket'], ['la boulangerie', 'the bakery'], ['le musée', 'the museum'], ['la poste', 'the post office'], ['l’hôpital', 'the hospital']] },
        { t: 'table', title: 'Aller + à', intro: '**Aller** (to go) is irregular. With **à** + article, some forms contract.',
          head: ['aller', 'à + article', 'Example'],
          rows: [['je vais', 'à + le = **au**', 'Je vais **au** cinéma.'], ['tu vas', 'à + la = **à la**', 'Tu vas **à la** banque ?'], ['il / elle va', 'à + l’ = **à l’**', 'Elle va **à l’**hôpital.'], ['nous allons', 'à + les = **aux**', 'Nous allons **aux** toilettes.'], ['vous allez', 'cities: **à**', 'Vous allez **à** Paris ?'], ['ils / elles vont', '', 'Ils vont **au** marché.']] },
        { t: 'table', title: 'Il y a & les prépositions', intro: '**Il y a** = there is / there are (singular and plural).',
          head: ['French', 'English'],
          rows: [['Il y a une boulangerie dans ma rue.', 'There is a bakery in my street.'], ['Il n’y a pas de métro.', 'There is no metro.'], ['La banque est **à côté de** la poste.', 'next to'], ['Le café est **en face de** la gare.', 'opposite'], ['La pharmacie est **entre** la banque **et** le musée.', 'between'], ['L’hôtel est **près de** / **loin de** la plage.', 'near / far from']],
          note: 'de + le = **du**: à côté **du** musée. de + les = **des**: près **des** magasins.' },
        { t: 'dialogue', title: 'Demander son chemin',
          lines: [['Le touriste', 'Excusez-moi, où est la gare, s’il vous plaît ?', 'Excuse me, where is the station, please?'], ['La passante', 'Allez tout droit, puis tournez à gauche.', 'Go straight on, then turn left.'], ['Le touriste', 'C’est loin ?', 'Is it far?'], ['La passante', 'Non, c’est à cinq minutes à pied. La gare est en face de la poste.', 'No, it’s five minutes on foot. The station is opposite the post office.'], ['Le touriste', 'Merci beaucoup !', 'Thank you very much!'], ['La passante', 'De rien. Bonne journée !', 'You’re welcome. Have a nice day!']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Je vais à le cinéma.', 'Je vais au cinéma.', 'à + le = au.'], ['La banque est à côté de le parc.', 'La banque est à côté du parc.', 'de + le = du.'], ['Il y a pas une piscine.', 'Il n’y a pas de piscine.', 'Negative: il n’y a pas de.']] }
      ],
      vocab: [['tout droit', 'straight on'], ['à gauche', 'to the left'], ['à droite', 'to the right'], ['tourner', 'to turn'], ['près de', 'near'], ['loin de', 'far from'], ['à pied', 'on foot'], ['la rue', 'the street']],
      practice: [
        ['choice', 'Je vais ___ cinéma ce soir.', ['au', 'à le', 'à la', 'aux'], 'à + le = au.'],
        ['choice', 'Nous allons ___ pharmacie.', ['à la', 'au', 'aux', 'à le'], 'pharmacie is feminine → à la.'],
        ['gap', 'Ils ___ (aller) à Paris demain.', ['vont'], 'ils → vont.'],
        ['gap', 'Il n’y a pas ___ banque ici.', ['de'], 'After a negative → de.'],
        ['choice', 'La poste est à côté ___ supermarché.', ['du', 'de le', 'de la', 'des'], 'de + le = du.'],
        ['match', 'Match the directions.', [['tout droit', 'straight on'], ['à gauche', 'left'], ['à droite', 'right'], ['en face de', 'opposite'], ['près de', 'near']]],
        ['order', 'Où est la gare, s’il vous plaît ?', 'Where is the station, please?'],
        ['listen', 'Tournez à droite après la banque.']
      ],
      summary: ['Aller: je vais, tu vas, il va, nous allons, vous allez, ils vont.', 'à + le = au, à + les = aux; de + le = du, de + les = des.', 'Il y a = there is / are; il n’y a pas de = there isn’t / aren’t.']
    }
  ]
});
