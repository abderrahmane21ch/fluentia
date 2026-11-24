/* English · A2 Elementary */
FL.addLevel('en', {
  code: 'A2',
  name: 'Elementary',
  summary: 'Talk about the past, compare things, make plans and share your experiences.',
  outcome: 'By the end of A2 you can describe past events, make comparisons, talk about plans and handle everyday situations such as restaurants and shops.',
  lessons: [
    {
      title: 'Last weekend',
      focus: 'Past simple: regular & irregular verbs',
      minutes: 25,
      goals: ['Talk about finished actions in the past', 'Form regular (-ed) and common irregular past verbs', 'Ask and answer past simple questions'],
      slides: [
        { t: 'text', title: 'The past simple',
          body: ['We use the **past simple** for finished actions at a specific time in the past: *yesterday, last week, in 2020, two days ago*.',
            'Regular verbs add **-ed**: work → work**ed**, play → play**ed**, live → live**d**, study → stud**ied**, stop → stop**ped**.',
            'The past simple is the **same for all persons**: I worked, she worked, they worked.'] },
        { t: 'table', title: 'Common irregular verbs', intro: 'Many everyday verbs are irregular. Learn them in groups.',
          head: ['Verb', 'Past', 'Verb', 'Past'],
          rows: [['go', 'went', 'see', 'saw'], ['have', 'had', 'eat', 'ate'], ['do', 'did', 'buy', 'bought'], ['make', 'made', 'take', 'took'], ['get', 'got', 'come', 'came'], ['be', 'was / were', 'meet', 'met']] },
        { t: 'table', title: 'Negatives and questions', intro: 'Use **did / didn’t + base verb**. The main verb goes back to its base form.',
          head: ['Form', 'Example'],
          rows: [['Negative', 'I **didn’t go** out. (~~didn’t went~~)'], ['Question', '**Did** you **see** the match?'], ['Short answer', 'Yes, I did. / No, I didn’t.'], ['Wh- question', 'Where **did** you **go**? What **did** you **eat**?']],
          note: 'The verb "be" is different: I **wasn’t** tired. **Were** you at home?' },
        { t: 'dialogue', title: 'Monday morning',
          lines: [['Maya', 'Hi Tom! Did you have a good weekend?'], ['Tom', 'Yes, I did, thanks. I went to Melaka with my family.'], ['Maya', 'Oh nice! What did you do there?'], ['Tom', 'We visited the old town and ate a lot of chicken rice balls.'], ['Maya', 'Sounds great. Did you stay in a hotel?'], ['Tom', 'No, we didn’t. We came back on Sunday evening. And you?'], ['Maya', 'I stayed at home and watched films. It was very relaxing!']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['I goed to the beach.', 'I went to the beach.', '"Go" is irregular.'], ['Did you went home?', 'Did you go home?', 'After "did", use the base verb.'], ['I didn’t saw him.', 'I didn’t see him.', 'After "didn’t", use the base verb.'], ['Yesterday I am tired.', 'Yesterday I was tired.', 'Past of am / is → was.']] }
      ],
      vocab: [['yesterday', 'the day before today'], ['last weekend', 'the weekend before this one'], ['ago', 'before now (two days ago)'], ['visit', 'go to see a place or person'], ['stay', 'remain somewhere (stay at home, stay in a hotel)'], ['relaxing', 'calm and pleasant'], ['trip', 'a short journey'], ['went', 'past of go']],
      practice: [
        ['gap', 'Last night I ___ (watch) a great film.', ['watched'], 'Regular verb: watch → watched.'],
        ['gap', 'We ___ (go) to the beach on Saturday.', ['went'], 'Go is irregular: went.'],
        ['choice', 'Did you ___ your homework?', ['do', 'did', 'done', 'doing'], 'After "did" → base verb.'],
        ['choice', 'She ___ at the party yesterday.', ['wasn’t', 'didn’t', 'weren’t', 'not was'], 'Negative of "was" → wasn’t.'],
        ['match', 'Match the verb with its past form.', [['eat', 'ate'], ['buy', 'bought'], ['take', 'took'], ['see', 'saw'], ['make', 'made']]],
        ['choice', 'I met my best friend ten years ___.', ['ago', 'before', 'last', 'past'], '"Ago" comes after the time period.'],
        ['gap', 'Where ___ you go on holiday last year?', ['did'], 'Wh- question in the past: Where did you…?'],
        ['order', 'What did you eat for dinner?'],
        ['listen', 'We visited my grandparents last weekend.']
      ],
      summary: ['Past simple = finished actions: regular verbs + -ed, irregulars must be learned.', 'Negatives and questions use did / didn’t + base verb.', 'Time expressions: yesterday, last week, two days ago, in 2019.']
    },
    {
      title: 'Bigger, better, the best',
      focus: 'Comparatives & superlatives',
      minutes: 20,
      goals: ['Compare two things with comparatives', 'Say which is the most / -est in a group', 'Use irregular forms: good, bad, far'],
      slides: [
        { t: 'table', title: 'How to form them', head: ['Adjective', 'Rule', 'Comparative', 'Superlative'],
          rows: [['short (1 syllable)', '+ -er / -est', 'cheap**er**', 'the cheap**est**'], ['ends in -e', '+ -r / -st', 'nice**r**', 'the nice**st**'], ['vowel + consonant', 'double the consonant', 'big**ger**', 'the big**gest**'], ['ends in -y', 'y → -ier / -iest', 'eas**ier**', 'the eas**iest**'], ['long (2+ syllables)', 'more / the most', '**more** expensive', '**the most** expensive']] },
        { t: 'table', title: 'Irregular adjectives', head: ['Adjective', 'Comparative', 'Superlative'],
          rows: [['good', 'better', 'the best'], ['bad', 'worse', 'the worst'], ['far', 'further / farther', 'the furthest']] },
        { t: 'text', title: 'How to use them',
          body: ['Comparative + **than**: Kuala Lumpur is **bigger than** Ipoh.', 'Superlative with **the** + in / of: Mount Kinabalu is **the highest** mountain **in** Malaysia.',
            'Same level: **as + adjective + as** → My phone is **as fast as** yours.', 'Negative: not as…as → The bus is**n’t as quick as** the train.'] },
        { t: 'examples', title: 'Listen and repeat', items: [['The train is faster than the bus.', 'comparative'], ['This is the best restaurant in town.', 'irregular superlative'], ['English is easier than I thought.', 'y → ier'], ['July is the hottest month of the year.', 'double consonant'], ['This hotel is more comfortable than the last one.', 'long adjective']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['She is more tall than me.', 'She is taller than me.', 'Short adjectives use -er.'], ['It’s the more expensive car.', 'It’s the most expensive car.', 'Superlative = the most.'], ['He is gooder than me.', 'He is better than me.', 'Good is irregular.'], ['bigger that', 'bigger than', 'Use "than" after comparatives.']] }
      ],
      vocab: [['cheap', 'low price'], ['expensive', 'high price'], ['crowded', 'full of people'], ['quiet', 'with little noise'], ['comfortable', 'pleasant and relaxing to use'], ['modern', 'new and up to date'], ['than', 'used after comparatives'], ['the best', 'superlative of good']],
      practice: [
        ['gap', 'My bag is ___ (heavy) than yours.', ['heavier'], 'y → ier.'],
        ['gap', 'This is the ___ (good) coffee in the city.', ['best'], 'good → better → the best.'],
        ['choice', 'A plane is ___ a car.', ['faster than', 'more fast than', 'fastest than', 'faster that'], 'Short adjective + -er + than.'],
        ['choice', 'It was the ___ day of my life.', ['worst', 'baddest', 'worse', 'most bad'], 'bad → worse → the worst.'],
        ['choice', 'Which is correct?', ['Rome is more beautiful than Milan.', 'Rome is beautifuler than Milan.', 'Rome is most beautiful than Milan.', 'Rome is more beautiful that Milan.'], 'Long adjectives use more + than.'],
        ['gap', 'The Nile is the ___ (long) river in the world.', ['longest'], 'Superlative: the + -est.'],
        ['match', 'Match the opposites.', [['cheap', 'expensive'], ['quiet', 'noisy'], ['modern', 'old-fashioned'], ['better', 'worse']]],
        ['order', 'My sister is taller than me.'],
        ['listen', 'This is the biggest shopping centre in the city.']
      ],
      summary: ['Short adjectives: -er / the -est; long adjectives: more / the most.', 'Irregular: good → better → best; bad → worse → worst.', 'Use than after comparatives and the before superlatives.']
    },
    {
      title: 'Plans and predictions',
      focus: 'going to · will · present continuous for the future',
      minutes: 25,
      goals: ['Talk about plans and intentions with "going to"', 'Make quick decisions, offers and predictions with "will"', 'Describe fixed arrangements with the present continuous'],
      slides: [
        { t: 'table', title: 'Three ways to talk about the future', head: ['Form', 'Use', 'Example'],
          rows: [['be going to + verb', 'plans and intentions (decided before)', 'I’m **going to** study medicine.'], ['will + verb', 'decisions at the moment of speaking, offers, promises', 'It’s cold. I**’ll** close the window.'], ['present continuous', 'fixed arrangements (time / place agreed)', 'I’m **meeting** Sara at 6 tomorrow.']] },
        { t: 'text', title: 'Predictions',
          body: ['Use **going to** when there is **evidence now**: Look at those clouds! It’s **going to** rain.', 'Use **will** for opinions and beliefs: I think you**’ll** pass the exam. · Prices **will** probably go up.',
            'Negative forms: I’m **not going to** buy it. · I **won’t** (will not) tell anyone.'] },
        { t: 'dialogue', title: 'Weekend plans',
          lines: [['Ahmad', 'What are you doing this weekend?'], ['Chloe', 'I’m visiting my aunt on Saturday. We booked the bus tickets yesterday.'], ['Ahmad', 'And on Sunday?'], ['Chloe', 'I’m going to clean my flat. It’s a mess!'], ['Ahmad', 'I’m going to the cinema on Sunday evening. Do you want to come?'], ['Chloe', 'OK, I’ll come! I’ll text you after lunch.']] },
        { t: 'examples', title: 'Which future?', items: [['I’m going to learn to drive this year.', 'a plan'], ['The phone’s ringing — I’ll get it!', 'instant decision'], ['We’re flying to Bangkok on Friday.', 'arrangement (tickets booked)'], ['I promise I’ll call you tonight.', 'promise'], ['Be careful! You’re going to fall!', 'evidence now']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['I will to call you.', 'I will call you.', 'No "to" after will.'], ['Tomorrow I go to the dentist at 10.', 'Tomorrow I’m going to the dentist at 10.', 'Arrangements use the present continuous.'], ['I going to study.', 'I’m going to study.', 'Don’t forget the verb "be".']] }
      ],
      vocab: [['plan', 'something you have decided to do'], ['arrangement', 'a plan with another person, time and place'], ['promise', 'say you will definitely do something'], ['probably', 'very likely'], ['book (tickets)', 'reserve in advance'], ['this weekend', 'the next Saturday and Sunday'], ['next month', 'the month after this one'], ['won’t', 'will not']],
      practice: [
        ['choice', 'A: "I’m thirsty." B: "Wait, I ___ get you some water."', ['’ll', '’m going to', 'am getting', 'get'], 'Offer / instant decision → will.'],
        ['choice', 'Look at that car! It ___ crash!', ['is going to', 'will', 'crashes', 'is crash'], 'Evidence now → going to.'],
        ['gap', 'We ___ (meet) the clients at 3 pm tomorrow. It’s in my diary.', ['are meeting', '’re meeting'], 'Fixed arrangement → present continuous.'],
        ['gap', 'I promise I ___ (not) be late again.', ['won’t', 'will not'], 'Promise → will / won’t.'],
        ['choice', 'What ___ do after university?', ['are you going to', 'will you to', 'you going to', 'do you will'], 'Plans → be going to.'],
        ['match', 'Match the sentence with its use.', [['I’ll help you with that box.', 'offer'], ['I’m going to save money this year.', 'plan'], ['I’m seeing the doctor at 9.', 'arrangement'], ['I think it will be sunny.', 'opinion / prediction']]],
        ['order', 'I am going to start a new job.'],
        ['listen', 'I think you will love this city.']
      ],
      summary: ['going to = plans and predictions with evidence.', 'will = instant decisions, offers, promises and opinions about the future.', 'present continuous = fixed arrangements with a time and place.']
    },
    {
      title: 'Have you ever…?',
      focus: 'Present perfect for experiences',
      minutes: 25,
      goals: ['Talk about life experiences', 'Form the present perfect with past participles', 'Choose between present perfect and past simple'],
      slides: [
        { t: 'text', title: 'Form',
          body: ['**have / has + past participle** → I **have visited** Japan. She **has eaten** durian.', 'Regular participles = past form (-ed): visited, worked, tried.',
            'Irregular participles must be learned: go → **gone / been**, eat → **eaten**, see → **seen**, do → **done**, be → **been**, write → **written**.'] },
        { t: 'table', title: 'Experiences: ever and never', head: ['Form', 'Example'],
          rows: [['Question', '**Have** you **ever** been to Paris?'], ['Yes', 'Yes, I **have**. I’ve been there twice.'], ['No', 'No, I **haven’t**. / No, I’ve **never** been there.'], ['He / she', '**Has** she **ever** tried sushi? — No, she **hasn’t**.']],
          note: '**been** vs **gone**: He has **been** to London (and come back). He has **gone** to London (he is there now).' },
        { t: 'table', title: 'Present perfect or past simple?', head: ['Present perfect', 'Past simple'],
          rows: [['Experience, no specific time', 'Finished time is mentioned'], ['I’ve **been** to Italy.', 'I **went** to Italy **in 2019**.'], ['Have you ever **met** a celebrity?', 'When **did** you **meet** him?']],
          note: 'We often start with the present perfect and continue with the past simple to give details.' },
        { t: 'dialogue', title: 'Getting to know you',
          lines: [['Nadia', 'Have you ever travelled abroad?'], ['Leo', 'Yes, I have. I’ve been to Thailand and Vietnam.'], ['Nadia', 'Really? When did you go to Vietnam?'], ['Leo', 'I went there last December. It was amazing.'], ['Nadia', 'Have you ever tried pho?'], ['Leo', 'Of course! I ate it every day!'], ['Nadia', 'I’ve never been to Asia outside Malaysia. I’d love to go!']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['I have been to Paris last year.', 'I went to Paris last year.', 'Finished time → past simple.'], ['Have you ever eat sushi?', 'Have you ever eaten sushi?', 'Use the past participle.'], ['She have visited Rome.', 'She has visited Rome.', 'He / she / it → has.']] }
      ],
      vocab: [['ever', 'at any time in your life'], ['never', 'at no time'], ['abroad', 'in another country'], ['twice', 'two times'], ['once', 'one time'], ['experience', 'something that happens to you'], ['amazing', 'very good, surprising'], ['been', 'past participle of be (visited)']],
      practice: [
        ['gap', 'Have you ever ___ (see) a whale?', ['seen'], 'See → saw → seen.'],
        ['choice', 'She ___ never been to Europe.', ['has', 'have', 'is', 'did'], 'He / she / it → has.'],
        ['choice', 'I ___ my passport two weeks ago.', ['lost', 'have lost', 'has lost', 'lose'], '"Two weeks ago" = finished time → past simple.'],
        ['choice', 'Where is Ali? — He’s ___ to the bank. He’ll be back soon.', ['gone', 'been', 'went', 'go'], 'He is still there → gone.'],
        ['gap', 'Have you ever eaten durian? — No, I ___.', ['haven’t', 'have not'], 'Short answer: No, I haven’t.'],
        ['match', 'Match verb and past participle.', [['write', 'written'], ['do', 'done'], ['eat', 'eaten'], ['be', 'been'], ['take', 'taken']]],
        ['order', 'Have you ever been to London?'],
        ['listen', 'I have never tried skydiving.']
      ],
      summary: ['Present perfect = have / has + past participle, for life experiences.', 'ever in questions, never in negatives: Have you ever…? I’ve never…', 'Specific past time (yesterday, in 2020) → past simple.']
    },
    {
      title: 'At the restaurant',
      focus: 'Polite requests & offers: can, could, would like',
      minutes: 20,
      goals: ['Order food and drinks politely', 'Make requests with can / could', 'Use would like and would you like…?'],
      slides: [
        { t: 'table', title: 'Polite language', intro: 'In English, the more indirect the request, the more polite it sounds.',
          head: ['Less polite', 'More polite'],
          rows: [['Give me the menu.', '**Could I have** the menu, please?'], ['I want a coffee.', '**I’d like** a coffee, please.'], ['Bring the bill.', '**Could we have** the bill, please?'], ['Do you want tea?', '**Would you like** some tea?']] },
        { t: 'text', title: 'Can, could and would like',
          body: ['**Can / Could + I / you + verb** for requests: Can I pay by card? · Could you bring some water?', '**I’d like (would like) + noun / to + verb**: I’d like the chicken. · I’d like to book a table.',
            '**Would you like…?** for offers: Would you like a dessert? — Yes, please. / No, thank you.'] },
        { t: 'dialogue', title: 'Ordering a meal',
          lines: [['Waiter', 'Good evening. Are you ready to order?'], ['Customer', 'Yes, I’d like the grilled fish, please.'], ['Waiter', 'Would you like rice or salad with that?'], ['Customer', 'Salad, please. Could I also have a glass of lime juice?'], ['Waiter', 'Of course. Anything else?'], ['Customer', 'No, that’s all, thanks.'], ['Customer', '(later) Excuse me, could we have the bill, please?'], ['Waiter', 'Certainly. Would you like to pay by card or cash?']] },
        { t: 'vocab', title: 'Restaurant words', words: [['menu', 'list of food and prices'], ['starter', 'small dish before the main course'], ['main course', 'the biggest part of the meal'], ['dessert', 'sweet food at the end'], ['the bill', 'the paper with the price to pay'], ['tip', 'extra money for good service'], ['spicy', 'hot, with chilli'], ['vegetarian', 'without meat or fish']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['I would like that you bring water.', 'Could you bring some water, please?', 'Use "could you + verb" for requests.'], ['Would you like to dessert?', 'Would you like a dessert?', 'Would like + noun (no "to").'], ['Can I to pay by card?', 'Can I pay by card?', 'No "to" after can / could.']] }
      ],
      vocab: [['order', 'ask for food in a restaurant'], ['book a table', 'reserve a place in advance'], ['the bill', 'what you pay at the end'], ['waiter', 'person who serves food'], ['Could I have…?', 'polite request'], ['I’d like…', 'polite way to say I want'], ['delicious', 'very tasty'], ['Anything else?', 'question asking if you want more']],
      practice: [
        ['choice', 'Which is the most polite?', ['Could I have some water, please?', 'Give me water.', 'I want water.', 'Water now.'], 'Could I have…, please? is polite.'],
        ['gap', 'I’d ___ the vegetable curry, please.', ['like'], 'I’d like = I would like.'],
        ['choice', '___ you like some more coffee?', ['Would', 'Do', 'Could', 'Will'], 'Offers: Would you like…?'],
        ['choice', 'Can I ___ by card?', ['pay', 'to pay', 'paying', 'paid'], 'Can + base verb.'],
        ['match', 'Match the question and the answer.', [['Are you ready to order?', 'Yes, I’d like the soup.'], ['Would you like a dessert?', 'No, thank you.'], ['Could we have the bill?', 'Certainly, here you are.'], ['Anything else?', 'No, that’s all.']]],
        ['gap', 'Could you ___ me the salt, please? (pass)', ['pass'], 'Could you + base verb.'],
        ['order', 'Could we have the menu, please?'],
        ['listen', 'I would like to book a table for two.']
      ],
      summary: ['Requests: Can / Could I have…? Could you + verb…?', 'Wants: I’d like + noun or I’d like to + verb.', 'Offers: Would you like…? — Yes, please. / No, thank you.']
    }
  ]
});
