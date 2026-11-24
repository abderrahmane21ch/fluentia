/* English · B1 Intermediate */
FL.addLevel('en', {
  code: 'B1',
  name: 'Intermediate',
  summary: 'Tell your life story, talk about possibilities, rules and news, and understand the passive.',
  outcome: 'By the end of B1 you can describe experiences and events, give opinions and advice, talk about imaginary situations and follow the main points of the news.',
  lessons: [
    {
      title: 'Life stories',
      focus: 'Present perfect vs past simple · for & since',
      minutes: 25,
      goals: ['Talk about situations that started in the past and continue now', 'Use for and since correctly', 'Choose between present perfect and past simple in a story'],
      slides: [
        { t: 'text', title: 'Unfinished time',
          body: ['We use the **present perfect** for situations that **started in the past and are still true now**.', 'I**’ve lived** in Kuala Lumpur **for** five years. (I still live there.)',
            'Compare: I **lived** in Algiers **for** ten years. (I don’t live there now — finished.)', 'Ask about duration with **How long…?** → How long **have** you **worked** here?'] },
        { t: 'table', title: 'for or since?', head: ['for + a period of time', 'since + a point in time'],
          rows: [['for three years', 'since 2021'], ['for a long time', 'since I was a child'], ['for two weeks', 'since Monday'], ['for ages', 'since last summer']] },
        { t: 'table', title: 'Present perfect continuous', intro: 'With activity verbs (work, study, live, wait) we often use **have / has been + -ing** to focus on the duration.',
          head: ['Form', 'Example'],
          rows: [['have / has been + -ing', 'I**’ve been studying** English for six months.'], ['Question', 'How long **have** you **been waiting**?'], ['State verbs (know, like, have)', 'I**’ve known** her since school. (~~been knowing~~)']] },
        { t: 'examples', title: 'A short biography', items: [['Malik was born in Oran in 1998.', 'past simple — finished'], ['He moved to Malaysia in 2019.', 'past simple — specific time'], ['He has lived in Kuala Lumpur since then.', 'present perfect — still true'], ['He has been working as a designer for three years.', 'duration until now'], ['He has visited twelve countries so far.', 'experience until now']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['I live here since 2020.', 'I’ve lived here since 2020.', 'Unfinished time → present perfect.'], ['I’ve worked here since three years.', 'I’ve worked here for three years.', 'Period of time → for.'], ['How long are you married?', 'How long have you been married?', 'Duration until now → present perfect.']] }
      ],
      vocab: [['be born', 'start your life (I was born in…)'], ['move (house / country)', 'go to live in a new place'], ['so far', 'until now'], ['since then', 'from that time until now'], ['for ages', 'for a very long time'], ['grow up', 'change from a child to an adult'], ['career', 'the jobs you do in your life'], ['settle down', 'start a calm life in one place']],
      practice: [
        ['gap', 'I have known Sam ___ we were at school.', ['since'], 'A point in time (when we were at school) → since.'],
        ['gap', 'She’s been learning Spanish ___ two years.', ['for'], 'A period of time → for.'],
        ['choice', 'We ___ in this flat since 2022.', ['have lived', 'live', 'lived', 'are living'], 'Started in the past, still true → present perfect.'],
        ['choice', 'He ___ to Canada in 2015.', ['moved', 'has moved', 'has been moving', 'moves'], '"In 2015" = finished time → past simple.'],
        ['choice', 'How long ___ you been waiting?', ['have', 'are', 'did', 'do'], 'Present perfect continuous: have + been + -ing.'],
        ['choice', 'Which sentence is correct?', ['I’ve known him for years.', 'I’ve been knowing him for years.', 'I know him for years.', 'I knew him since years.'], '"Know" is a state verb — no continuous form.'],
        ['match', 'Match each time expression with for or since.', [['six months', 'for'], ['2018', 'since'], ['last Friday', 'since'], ['a long time', 'for']]],
        ['order', 'How long have you lived here?'],
        ['listen', 'I have been working here since January.']
      ],
      summary: ['Present perfect (continuous) for situations that started in the past and continue now.', 'for + period (for two years), since + point in time (since 2020).', 'Finished time or finished situations → past simple.']
    },
    {
      title: 'What would you do if…?',
      focus: 'First & second conditionals',
      minutes: 25,
      goals: ['Talk about real future possibilities (first conditional)', 'Imagine unreal or unlikely situations (second conditional)', 'Use unless, as soon as and when'],
      slides: [
        { t: 'table', title: 'First conditional — real possibilities', head: ['if-clause', 'main clause'],
          rows: [['If + present simple', 'will / can / might + verb'], ['If it **rains** tomorrow,', 'we**’ll stay** at home.'], ['If you **study** hard,', 'you**’ll pass** the exam.'], ['If I **don’t leave** now,', 'I**’ll miss** the bus.']],
          note: 'Never use *will* in the if-clause: ~~If it will rain~~ → If it rains.' },
        { t: 'table', title: 'Second conditional — imaginary situations', head: ['if-clause', 'main clause'],
          rows: [['If + past simple', 'would / could + verb'], ['If I **won** the lottery,', 'I**’d travel** the world.'], ['If I **had** more time,', 'I **would learn** the piano.'], ['If I **were** you,', 'I**’d accept** the job.']],
          note: 'The past tense here does **not** mean past time — it shows the situation is imaginary. "If I were you" is used to give advice.' },
        { t: 'text', title: 'unless, when, as soon as',
          body: ['**unless** = if…not → I won’t go **unless** you come with me. (= if you don’t come)', '**when** = it will definitely happen → **When** I get home, I’ll call you.', '**as soon as** = immediately after → I’ll text you **as soon as** I arrive.'] },
        { t: 'dialogue', title: 'Dreams and plans',
          lines: [['Aisha', 'What would you do if you didn’t have to work?'], ['Ben', 'If I didn’t have to work, I’d travel around South America.'], ['Aisha', 'Really? Would you learn Spanish?'], ['Ben', 'Definitely. If I spoke Spanish, it would be much easier.'], ['Aisha', 'Well, if you start an online course now, you’ll be ready next year!'], ['Ben', 'Good idea. I’ll look for one as soon as I get home.']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['If I will see him, I’ll tell him.', 'If I see him, I’ll tell him.', 'No "will" in the if-clause.'], ['If I would have money, I would buy it.', 'If I had money, I would buy it.', 'Second conditional: if + past simple.'], ['If I was you, I’d go.', 'If I were you, I’d go.', '"If I were you" is the standard form for advice.']] }
      ],
      vocab: [['possibility', 'something that may happen'], ['imaginary', 'not real'], ['win the lottery', 'get a big prize of money by chance'], ['unless', 'if not'], ['as soon as', 'immediately when'], ['might', 'possibly will'], ['advice', 'an opinion about what someone should do'], ['definitely', 'certainly']],
      practice: [
        ['gap', 'If you heat ice, it ___ (melt).', ['melts', 'will melt'], 'For facts we use if + present, present (zero conditional); "will melt" is also fine.'],
        ['choice', 'If she ___ the bus, she’ll be late.', ['misses', 'will miss', 'missed', 'would miss'], 'First conditional: if + present simple.'],
        ['choice', 'If I ___ rich, I would buy a house by the sea.', ['were', 'am', 'will be', 'would be'], 'Second conditional: if + past (were).'],
        ['gap', 'If I had a car, I ___ (drive) to work.', ['would drive', '’d drive'], 'Second conditional: would + verb.'],
        ['choice', 'I won’t call you ___ there’s a problem.', ['unless', 'if', 'when', 'as soon as'], 'unless = if not.'],
        ['choice', '"If I were you, I’d see a doctor." This sentence is…', ['advice', 'a fact', 'a past event', 'a promise'], '"If I were you…" is a common way to give advice.'],
        ['match', 'Match the beginnings and endings.', [['If it’s sunny tomorrow,', 'we’ll go to the beach.'], ['If I spoke Japanese,', 'I’d work in Tokyo.'], ['I’ll call you', 'as soon as I land.'], ['If I were you,', 'I’d apologise.']]],
        ['order', 'What would you do if you lost your phone?'],
        ['listen', 'If I had more time, I would read more books.']
      ],
      summary: ['First conditional: If + present, will + verb (real possibility).', 'Second conditional: If + past, would + verb (imaginary or unlikely).', 'unless = if not; when / as soon as + present for future time.']
    },
    {
      title: 'Rules and advice',
      focus: 'must, have to, should, don’t have to, mustn’t',
      minutes: 20,
      goals: ['Talk about rules and obligations', 'Understand the difference between mustn’t and don’t have to', 'Give advice with should and ought to'],
      slides: [
        { t: 'table', title: 'Obligation and prohibition', head: ['Modal', 'Meaning', 'Example'],
          rows: [['must', 'strong obligation (often the speaker’s opinion)', 'I **must** call my mother tonight.'], ['have to', 'obligation from rules / others', 'We **have to** wear a uniform at work.'], ['mustn’t', 'it’s not allowed (prohibition)', 'You **mustn’t** smoke here.'], ['don’t have to', 'it’s not necessary (you can choose)', 'You **don’t have to** come if you’re busy.']] },
        { t: 'text', title: 'The big difference',
          body: ['**mustn’t** = DON’T do it! → You **mustn’t** use your phone during the exam.', '**don’t have to** = it’s optional → You **don’t have to** bring a dictionary; we have some.',
            'In the past, use **had to** for both must and have to: Yesterday I **had to** work late.'] },
        { t: 'table', title: 'Advice: should and ought to', head: ['Form', 'Example'],
          rows: [['should + verb', 'You **should** drink more water.'], ['shouldn’t + verb', 'You **shouldn’t** stay up so late.'], ['ought to + verb (more formal)', 'You **ought to** tell your manager.'], ['Question', '**Should** I accept the offer?']] },
        { t: 'examples', title: 'At a new job', items: [['You have to arrive at 9 o’clock.', 'company rule'], ['You don’t have to wear a suit on Fridays.', 'not necessary'], ['You mustn’t share your password with anyone.', 'prohibited'], ['You should ask questions if you aren’t sure.', 'advice'], ['I must remember to send that email.', 'personal obligation']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['You must to wear a helmet.', 'You must wear a helmet.', 'No "to" after must / should.'], ['She have to work tomorrow.', 'She has to work tomorrow.', 'He / she / it → has to.'], ['I musted go yesterday.', 'I had to go yesterday.', 'Past of must → had to.']] }
      ],
      vocab: [['rule', 'something you must or mustn’t do'], ['allowed', 'permitted'], ['forbidden', 'not allowed'], ['necessary', 'needed'], ['uniform', 'special clothes for work or school'], ['deadline', 'the last time to finish something'], ['advice', 'a suggestion about what to do'], ['optional', 'you can choose']],
      practice: [
        ['choice', 'You ___ park here. It’s for ambulances only.', ['mustn’t', 'don’t have to', 'shouldn’t to', 'don’t must'], 'Prohibition → mustn’t.'],
        ['choice', 'It’s Saturday. I ___ get up early.', ['don’t have to', 'mustn’t', 'haven’t', 'must not to'], 'Not necessary → don’t have to.'],
        ['gap', 'You look tired. You ___ go to bed early. (advice)', ['should', 'ought to'], 'Advice → should.'],
        ['gap', 'Last week I ___ to work every evening. (have)', ['had'], 'Past of have to / must → had to.'],
        ['choice', 'My brother ___ wear glasses to drive.', ['has to', 'have to', 'must to', 'haves to'], 'He → has to.'],
        ['match', 'Match the sign with its meaning.', [['NO PHOTOS', 'You mustn’t take pictures.'], ['FREE ENTRY', 'You don’t have to pay.'], ['SEATBELTS REQUIRED', 'You have to wear a seatbelt.'], ['Try the local food!', 'You should taste it.']]],
        ['order', 'You should talk to your teacher.'],
        ['listen', 'You don’t have to answer right now.']
      ],
      summary: ['must / have to = obligation; mustn’t = prohibition.', 'don’t have to = not necessary (a free choice).', 'should / ought to = advice. Past obligation → had to.']
    },
    {
      title: 'Telling a story',
      focus: 'Narrative tenses: past continuous & past perfect',
      minutes: 30,
      goals: ['Set the scene of a story with the past continuous', 'Show which action happened first with the past perfect', 'Link events with when, while, by the time'],
      slides: [
        { t: 'table', title: 'Three narrative tenses', head: ['Tense', 'Use', 'Example'],
          rows: [['Past simple', 'main events in order', 'I **opened** the door and **saw** a cat.'], ['Past continuous (was / were + -ing)', 'background, action in progress', 'It **was raining** and people **were hurrying** home.'], ['Past perfect (had + participle)', 'an earlier past action', 'When I arrived, the film **had** already **started**.']] },
        { t: 'text', title: 'when and while',
          body: ['A long action interrupted by a short one: I **was cooking when** the phone **rang**.', '**While** + long action: **While** I **was walking** home, I **met** an old friend.',
            'Two long actions at the same time: **While** I **was studying**, my brother **was playing** video games.'] },
        { t: 'text', title: 'The past perfect',
          body: ['Use **had + past participle** to go **further back** in the past.', 'When we got to the station, the train **had left**. (The train left first.)', 'Compare: When we got to the station, the train **left**. (We arrived, then it left.)',
            'Useful with: already, just, never before, by the time → **By the time** the police arrived, the thief **had escaped**.'] },
        { t: 'examples', title: 'A story in four tenses', items: [['It was a cold night and the wind was blowing.', 'background'], ['I was walking home after work when I heard a noise.', 'interrupted action'], ['I turned around, but there was nobody there.', 'main events'], ['Then I realised I had left my keys at the office!', 'earlier action'], ['I had never felt so stupid before.', 'experience before that moment']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['When I arrived, she already left.', 'When I arrived, she had already left.', 'Earlier action → past perfect.'], ['While I cooked, the phone was ringing.', 'While I was cooking, the phone rang.', 'Long action = continuous; short interruption = simple.'], ['I was knowing the answer.', 'I knew the answer.', '"Know" is not used in the continuous.']] }
      ],
      vocab: [['suddenly', 'quickly and unexpectedly'], ['realise', 'understand something suddenly'], ['by the time', 'before or at the moment that'], ['meanwhile', 'at the same time'], ['eventually', 'in the end, after a long time'], ['notice', 'see or become aware of'], ['escape', 'get away from'], ['scene', 'the place where something happens']],
      practice: [
        ['choice', 'I ___ a shower when the lights went out.', ['was having', 'had', 'have had', 'had had'], 'Long action interrupted → past continuous.'],
        ['choice', 'When we arrived, everyone ___ home.', ['had gone', 'went', 'was going', 'has gone'], 'They left before we arrived → past perfect.'],
        ['gap', 'While she ___ (drive) to work, she saw an accident.', ['was driving'], 'While + past continuous.'],
        ['gap', 'I couldn’t pay because I ___ (forget) my wallet.', ['had forgotten'], 'Earlier past action → past perfect.'],
        ['choice', 'By the time the doctor came, the patient ___ better.', ['had felt', 'feels', 'was feel', 'has felt'], 'Before the doctor came → past perfect.'],
        ['choice', 'Which sentence describes the background?', ['The sun was shining and birds were singing.', 'The sun shone.', 'Then the sun came out.', 'The sun had shone.'], 'Background description → past continuous.'],
        ['match', 'Match each tense with its use.', [['past simple', 'main events'], ['past continuous', 'background'], ['past perfect', 'earlier event'], ['while', 'introduces a long action']]],
        ['order', 'I was reading when the phone rang.'],
        ['listen', 'When I got to the airport, the plane had already left.']
      ],
      summary: ['Past simple = main events; past continuous = background or action in progress.', 'Past perfect (had + participle) = the earlier of two past actions.', 'when + short action, while + long action, by the time + past perfect.']
    },
    {
      title: 'How things are made',
      focus: 'The passive voice (present & past)',
      minutes: 25,
      goals: ['Recognise and form the passive', 'Describe processes and inventions', 'Decide when to use by + agent'],
      slides: [
        { t: 'text', title: 'Active or passive?',
          body: ['**Active**: the subject *does* the action → Workers **pick** the tea leaves.', '**Passive**: the subject *receives* the action → The tea leaves **are picked** (by workers).',
            'We use the passive when the **action is more important** than who does it, or when we **don’t know** who did it: My bike **was stolen** last night.'] },
        { t: 'table', title: 'Form: be + past participle', head: ['Tense', 'Active', 'Passive'],
          rows: [['Present simple', 'They make phones in China.', 'Phones **are made** in China.'], ['Past simple', 'Bell invented the telephone.', 'The telephone **was invented** by Bell.'], ['Present perfect', 'Someone has cleaned the room.', 'The room **has been cleaned**.'], ['will', 'They will open a new café.', 'A new café **will be opened**.']] },
        { t: 'examples', title: 'From leaf to cup: how tea is made', items: [['First, the leaves are picked by hand in the Cameron Highlands.', ''], ['Then they are dried for several hours.', ''], ['Next, the leaves are rolled and cut.', ''], ['After that, they are heated to stop the process.', ''], ['Finally, the tea is packed and sent to shops.', '']] },
        { t: 'text', title: 'by + agent',
          body: ['Only add **by + person / thing** when it’s important or new information: *Guernica* was painted **by Picasso**.', 'Don’t add it when it’s obvious or unknown: The thief was arrested ~~by the police~~.'] },
        { t: 'mistakes', title: 'Common mistakes', items: [['The car was wash yesterday.', 'The car was washed yesterday.', 'Use the past participle.'], ['English is speak here.', 'English is spoken here.', 'Speak → spoken.'], ['The pyramids built 4,500 years ago.', 'The pyramids were built 4,500 years ago.', 'Don’t forget "be".']] }
      ],
      vocab: [['invent', 'create something new for the first time'], ['produce', 'make, especially in large amounts'], ['process', 'a series of steps'], ['harvest', 'collect crops'], ['export', 'send products to other countries'], ['steal → stolen', 'take without permission'], ['build → built', 'construct'], ['grow → grown', 'cultivate plants']],
      practice: [
        ['choice', 'Rice ___ in many Asian countries.', ['is grown', 'grows by', 'is grow', 'has grown by'], 'Present passive: is + past participle.'],
        ['choice', 'The Petronas Towers ___ in 1998.', ['were completed', 'completed', 'are completed', 'was complete'], 'Past passive: were + past participle.'],
        ['gap', 'This bridge was ___ (build) in 1890.', ['built'], 'Build → built.'],
        ['gap', 'Spanish is ___ (speak) in 20 countries.', ['spoken'], 'Speak → spoken.'],
        ['choice', 'Which sentence would be better with "by + agent"?', ['Romeo and Juliet was written in the 1590s.', 'My wallet was stolen yesterday.', 'The rubbish is collected every Monday.', 'The thief was arrested last night.'], 'Who wrote it (Shakespeare) is important information; in the others the agent is unknown or obvious.'],
        ['choice', 'Make it passive: "Someone has broken the window."', ['The window has been broken.', 'The window has broken.', 'The window was break.', 'The window is broken by someone.'], 'Present perfect passive: has been + participle.'],
        ['match', 'Match the verb with its participle.', [['write', 'written'], ['steal', 'stolen'], ['make', 'made'], ['choose', 'chosen'], ['send', 'sent']]],
        ['order', 'The museum was opened in 2010.'],
        ['listen', 'Coffee is grown in Brazil and Vietnam.']
      ],
      summary: ['Passive = be + past participle; the action is more important than the doer.', 'Change the tense of "be": is made / was made / has been made / will be made.', 'Add by + agent only when it is important.']
    }
  ]
});
