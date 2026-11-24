/* English · B2 Upper-intermediate */
FL.addLevel('en', {
  code: 'B2',
  name: 'Upper-intermediate',
  summary: 'Express regrets, report what people said, write richer sentences and sound more natural.',
  outcome: 'By the end of B2 you can discuss complex topics, argue a point of view, report conversations and write clear, well-linked texts.',
  lessons: [
    {
      title: 'Regrets and wishes',
      focus: 'Third conditional · I wish / If only',
      minutes: 30,
      goals: ['Talk about imaginary past situations with the third conditional', 'Express regrets with wish / if only', 'Mix second and third conditionals'],
      slides: [
        { t: 'table', title: 'Third conditional', intro: 'We imagine a **different past** — something that did **not** happen.',
          head: ['if-clause', 'main clause'],
          rows: [['If + past perfect', 'would have + past participle'], ['If I **had left** earlier,', 'I **wouldn’t have missed** the flight.'], ['If she **hadn’t helped** me,', 'I **would have failed**.'], ['If we**’d known** about the party,', 'we**’d have come**.']],
          note: 'Careful: **’d** = *had* in the if-clause and *would* in the main clause.' },
        { t: 'table', title: 'wish and if only', head: ['Regret about…', 'Form', 'Example'],
          rows: [['the present', 'wish + past simple', 'I **wish** I **spoke** French. (I don’t.)'], ['the past', 'wish + past perfect', 'I **wish** I **had studied** harder. (I didn’t.)'], ['someone’s annoying habit', 'wish + would', 'I **wish** you **would** stop interrupting!'], ['strong feeling', 'If only + past / past perfect', '**If only** I **hadn’t said** that!']] },
        { t: 'text', title: 'Mixed conditionals',
          body: ['Past cause → present result: If I **had taken** that job, I **would be** rich now.', 'Present cause → past result: If I **were** more organised, I **wouldn’t have lost** the documents.',
            'Other modals are possible: If you’d asked me, I **could have helped**. · She **might have passed** if she’d revised.'] },
        { t: 'dialogue', title: 'A missed opportunity',
          lines: [['Sofia', 'Did you apply for the scholarship in the end?'], ['Imran', 'No. I wish I had. The deadline was last Friday.'], ['Sofia', 'Oh no! If you’d told me, I would have reminded you.'], ['Imran', 'I know. If only I’d checked my emails more often.'], ['Sofia', 'Well, if you apply next year, you’ll have a stronger profile anyway.'], ['Imran', 'True. And if I hadn’t taken this internship, I wouldn’t have this experience now.']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['If I would have known, I would have called.', 'If I had known, I would have called.', 'No "would" in the if-clause.'], ['I wish I can swim.', 'I wish I could swim.', 'wish + past for present regrets.'], ['If he had came, he would enjoy it.', 'If he had come, he would have enjoyed it.', 'Past participle + would have.']] }
      ],
      vocab: [['regret', 'feel sorry about something you did or didn’t do'], ['opportunity', 'a chance to do something'], ['in the end', 'finally'], ['deadline', 'the latest time something must be done'], ['remind', 'help someone remember'], ['revise', 'study again before an exam'], ['scholarship', 'money given to support a student'], ['hindsight', 'understanding a situation after it has happened']],
      practice: [
        ['gap', 'If I had seen the sign, I ___ (not / park) there.', ['wouldn’t have parked', 'would not have parked'], 'Third conditional: would have + participle.'],
        ['choice', 'If she ___ harder, she would have passed.', ['had studied', 'studied', 'would study', 'has studied'], 'if + past perfect.'],
        ['choice', 'I wish I ___ taller. (present regret)', ['were', 'am', 'had been', 'will be'], 'wish + past (were) for present situations.'],
        ['choice', 'I wish I ___ that email. It caused so many problems.', ['hadn’t sent', 'didn’t send', 'don’t send', 'wouldn’t send'], 'Past regret → wish + past perfect.'],
        ['gap', 'If I had taken the job in Dubai, I ___ (live) there now.', ['would be living', 'would live', '’d be living', '’d live'], 'Mixed conditional: past cause, present result.'],
        ['choice', 'I wish my neighbours ___ so much noise at night.', ['wouldn’t make', 'don’t make', 'hadn’t made', 'won’t make'], 'Annoying habit → wish + would.'],
        ['match', 'Match the halves.', [['If I’d known it was your birthday,', 'I’d have bought you a present.'], ['I wish I spoke', 'more languages.'], ['If only I hadn’t', 'eaten so much.'], ['If he’d left earlier,', 'he would be here by now.']]],
        ['order', 'I wish I had listened to your advice.'],
        ['listen', 'If we had booked earlier, we would have got a better price.']
      ],
      summary: ['Third conditional: If + past perfect, would have + participle (unreal past).', 'wish + past = present regret; wish + past perfect = past regret; wish + would = annoying habit.', 'Mixed conditionals connect a past cause with a present result (and vice versa).']
    },
    {
      title: 'He said that…',
      focus: 'Reported speech & reporting verbs',
      minutes: 30,
      goals: ['Report statements and questions', 'Change tenses, pronouns and time words', 'Use reporting verbs like suggest, advise, refuse'],
      slides: [
        { t: 'table', title: 'Backshift: one tense back', head: ['Direct speech', 'Reported speech'],
          rows: [['"I **work** in a bank."', 'She said (that) she **worked** in a bank.'], ['"I**’m leaving**."', 'He said he **was leaving**.'], ['"I **saw** the film."', 'She said she **had seen** the film.'], ['"I**’ll call** you."', 'He said he **would call** me.'], ['"I **can** help."', 'She said she **could** help.']],
          note: 'If the information is still true, backshift is optional: He said he **lives** in Penang.' },
        { t: 'table', title: 'Time and place words', head: ['Direct', 'Reported'],
          rows: [['today', 'that day'], ['tomorrow', 'the next day / the following day'], ['yesterday', 'the day before / the previous day'], ['now', 'then / at that moment'], ['here', 'there'], ['this', 'that']] },
        { t: 'text', title: 'Reported questions',
          body: ['Use **statement word order** (subject + verb) and no question mark.', '"Where **do you live**?" → She asked me where **I lived**.', '"**Are** you tired?" → He asked **if / whether** I **was** tired.',
            'Use **ask, want to know, wonder**: They wanted to know when the shop opened.'] },
        { t: 'table', title: 'Reporting verbs', intro: 'Reporting verbs summarise what people meant, not only what they said.',
          head: ['Pattern', 'Verbs', 'Example'],
          rows: [['verb + to + infinitive', 'agree, refuse, promise, offer', 'He **refused to answer**.'], ['verb + object + to + inf.', 'advise, tell, ask, warn, remind', 'She **advised me to rest**.'], ['verb + -ing', 'suggest, deny, admit, recommend', 'He **suggested taking** a taxi.'], ['verb + that', 'explain, admit, complain', 'They **complained that** the room was dirty.']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['She said me that she was busy.', 'She told me that she was busy. / She said that she was busy.', 'tell + person; say (to + person).'], ['He asked me where did I live.', 'He asked me where I lived.', 'No question order in reported questions.'], ['She suggested me to go.', 'She suggested (that) I go / suggested going.', '"Suggest" is not followed by object + to.']] }
      ],
      vocab: [['claim', 'say something is true (without proof)'], ['deny', 'say something is not true'], ['admit', 'agree that something (bad) is true'], ['refuse', 'say you will not do something'], ['warn', 'tell someone about a danger'], ['whether', 'if (in reported questions)'], ['complain', 'say you are unhappy about something'], ['the following day', 'the next day']],
      practice: [
        ['gap', '"I am hungry." → He said he ___ hungry.', ['was'], 'am → was.'],
        ['gap', '"I will help you." → She said she ___ help me.', ['would'], 'will → would.'],
        ['choice', '"Where is the station?" → He asked me ___.', ['where the station was', 'where was the station', 'where is the station?', 'that where the station was'], 'Statement word order: subject + verb.'],
        ['choice', '"Do you like jazz?" → She asked ___ I liked jazz.', ['if', 'that', 'do', 'what'], 'Yes / no questions → if / whether.'],
        ['choice', '"I didn’t take the money!" → He ___ taking the money.', ['denied', 'refused', 'promised', 'agreed'], 'deny + -ing = say you didn’t do it.'],
        ['choice', 'The doctor ___ me to drink more water.', ['advised', 'suggested', 'said', 'explained'], 'advise + object + to-infinitive.'],
        ['match', 'Match the direct and reported time words.', [['tomorrow', 'the next day'], ['yesterday', 'the day before'], ['now', 'then'], ['here', 'there']]],
        ['order', 'She asked me if I was ready.'],
        ['listen', 'He told me that he had already finished the report.']
      ],
      summary: ['Move tenses one step back: present → past, past → past perfect, will → would.', 'Reported questions use statement word order and if / whether for yes / no questions.', 'Reporting verbs have patterns: refuse to do, advise someone to do, suggest doing.']
    },
    {
      title: 'People and places that…',
      focus: 'Defining & non-defining relative clauses',
      minutes: 25,
      goals: ['Combine sentences with who, which, that, whose, where', 'Know when you can omit the relative pronoun', 'Use commas correctly in non-defining clauses'],
      slides: [
        { t: 'table', title: 'Relative pronouns', head: ['Pronoun', 'For', 'Example'],
          rows: [['who / that', 'people', 'The woman **who** lives next door is a pilot.'], ['which / that', 'things, animals', 'The laptop **which** I bought is fast.'], ['whose', 'possession', 'That’s the man **whose** car was stolen.'], ['where', 'places', 'This is the café **where** we met.'], ['when', 'times', 'I remember the day **when** I arrived.']] },
        { t: 'text', title: 'Defining relative clauses',
          body: ['They give **essential** information: which person or thing we mean. **No commas.**', 'The students **who passed the test** received a certificate. (only those students)',
            'You can **omit** who / which / that when it is the **object** of the clause: The book (**that**) I’m reading is great.', 'But not when it is the subject: The man **who** called you is here. (~~The man called you is here.~~)'] },
        { t: 'text', title: 'Non-defining relative clauses',
          body: ['They add **extra** information. We use **commas** and **never "that"**.', 'My brother, **who lives in Sydney**, is visiting us next week. (I have one brother.)',
            '**which** can refer to a whole idea: He passed all his exams, **which** surprised everyone.', 'These clauses are more common in writing.'] },
        { t: 'examples', title: 'Listen and repeat', items: [['Kuala Lumpur, which is the capital of Malaysia, has a population of about two million.', 'non-defining'], ['The teacher who helped me most was patient and funny.', 'defining'], ['I met a girl whose father works for NASA.', 'whose'], ['That’s the hotel where we stayed last summer.', 'where'], ['The phone I ordered hasn’t arrived yet.', 'pronoun omitted']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['My sister, that lives in Ipoh, is a nurse.', 'My sister, who lives in Ipoh, is a nurse.', 'No "that" in non-defining clauses.'], ['The man which called is my boss.', 'The man who called is my boss.', 'who for people.'], ['This is the house where I was born in.', 'This is the house where I was born.', 'Don’t repeat the preposition.']] }
      ],
      vocab: [['population', 'number of people living in a place'], ['essential', 'absolutely necessary'], ['extra', 'additional'], ['neighbour', 'a person who lives next to you'], ['colleague', 'a person you work with'], ['landmark', 'a famous building or place'], ['whose', 'shows possession in relative clauses'], ['omit', 'leave out']],
      practice: [
        ['choice', 'The woman ___ works at the reception is very helpful.', ['who', 'which', 'whose', 'where'], 'People → who / that.'],
        ['choice', 'That’s the restaurant ___ we had our first date.', ['where', 'which', 'who', 'whose'], 'Place → where.'],
        ['gap', 'I have a friend ___ mother is a famous singer.', ['whose'], 'Possession → whose.'],
        ['choice', 'My car, ___ is ten years old, still runs perfectly.', ['which', 'that', 'who', 'what'], 'Non-defining clause about a thing → which (never that).'],
        ['choice', 'In which sentence can you omit the pronoun?', ['The film that we watched was boring.', 'The man who lives here is a doctor.', 'My mother, who is 60, loves hiking.', 'The dog that bit me ran away.'], 'You can omit it when it is the object: The film (that) we watched…'],
        ['choice', 'She didn’t call me back, ___ was really annoying.', ['which', 'that', 'what', 'who'], '"which" can refer to the whole previous idea.'],
        ['match', 'Match the pronoun with what it refers to.', [['who', 'people'], ['which', 'things'], ['where', 'places'], ['whose', 'possession'], ['when', 'times']]],
        ['order', 'This is the book that I told you about.'],
        ['listen', 'The city where I grew up has changed a lot.']
      ],
      summary: ['who (people), which (things), whose (possession), where (places), when (times); that = who / which in defining clauses.', 'Defining clauses: essential, no commas, pronoun can be omitted if it is the object.', 'Non-defining clauses: extra information, commas, never that.']
    },
    {
      title: 'Linking ideas',
      focus: 'Contrast, concession, cause and result',
      minutes: 30,
      goals: ['Connect ideas clearly in speaking and writing', 'Use although, despite, however, whereas correctly', 'Express cause and result with because of, due to, therefore'],
      slides: [
        { t: 'table', title: 'Contrast and concession', head: ['Linker', 'Followed by', 'Example'],
          rows: [['although / even though', 'subject + verb', '**Although** it was raining, we went out.'], ['despite / in spite of', 'noun or -ing', '**Despite** the rain, we went out. · **Despite being** tired, she finished.'], ['however', 'new sentence (+ comma)', 'The hotel was cheap. **However**, it was very noisy.'], ['whereas / while', 'compare two facts', 'I love coffee, **whereas** my wife prefers tea.']] },
        { t: 'table', title: 'Cause and result', head: ['Linker', 'Followed by', 'Example'],
          rows: [['because / since / as', 'subject + verb', 'We stayed in **because** it was cold.'], ['because of / due to', 'noun', 'The flight was delayed **due to** fog.'], ['so', 'result (subject + verb)', 'It was late, **so** we took a taxi.'], ['therefore / as a result', 'new sentence, more formal', 'Sales fell. **As a result**, the company closed two shops.']] },
        { t: 'text', title: 'Writing a balanced paragraph',
          body: ['**Topic sentence**: Working from home has clear advantages.', '**Support**: Employees save time **because** they don’t commute. **Moreover**, they can organise their day more flexibly.',
            '**Contrast**: **However**, some people feel isolated. **Although** video calls help, they cannot fully replace face-to-face contact.', '**Conclusion**: **Therefore**, a hybrid model may be the best solution.'] },
        { t: 'examples', title: 'Listen and repeat', items: [['Even though he was nervous, he gave a brilliant speech.', 'concession'], ['In spite of the traffic, we arrived on time.', 'noun after "in spite of"'], ['My sister is outgoing, whereas I am quite shy.', 'comparison'], ['The match was cancelled due to the heavy rain.', 'cause + noun'], ['Prices have risen. Therefore, people are spending less.', 'formal result']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['Despite it was raining, we went out.', 'Although it was raining / Despite the rain, we went out.', 'despite + noun / -ing, not a clause.'], ['Although he is rich, but he is unhappy.', 'Although he is rich, he is unhappy.', 'Don’t use although and but together.'], ['The game was cancelled because of it rained.', 'The game was cancelled because it rained.', 'because + clause; because of + noun.']] }
      ],
      vocab: [['moreover', 'in addition (formal)'], ['nevertheless', 'however, despite this'], ['whereas', 'used to compare two different facts'], ['due to', 'because of'], ['consequently', 'as a result'], ['advantage', 'a good point'], ['drawback', 'a disadvantage'], ['commute', 'travel to and from work']],
      practice: [
        ['choice', '___ the bad weather, the concert went ahead.', ['Despite', 'Although', 'However', 'Even though'], 'despite + noun.'],
        ['choice', '___ she studied hard, she failed the test.', ['Although', 'Despite', 'However', 'In spite of'], 'although + subject + verb.'],
        ['gap', 'The train was cancelled ___ a strike. (because + noun)', ['due to', 'because of', 'owing to'], 'Cause + noun → due to / because of.'],
        ['choice', 'I enjoy city life, ___ my brother prefers the countryside.', ['whereas', 'despite', 'therefore', 'because'], 'Comparing two different facts → whereas.'],
        ['choice', 'The product was poor. ___, sales were very low.', ['As a result', 'Although', 'Whereas', 'Despite'], 'Result in a new sentence → As a result / Therefore.'],
        ['gap', 'In spite of ___ (feel) ill, he went to work.', ['feeling'], 'in spite of + -ing.'],
        ['match', 'Match the linker with its function.', [['however', 'contrast'], ['therefore', 'result'], ['moreover', 'addition'], ['due to', 'cause'], ['whereas', 'comparison']]],
        ['order', 'Although it was expensive, we bought it.'],
        ['listen', 'However, there are some disadvantages to consider.']
      ],
      summary: ['although / even though + clause; despite / in spite of + noun or -ing; however starts a new sentence.', 'because + clause; because of / due to + noun; so / therefore / as a result for results.', 'Good paragraphs: topic sentence → support → contrast → conclusion.']
    },
    {
      title: 'Sounding natural',
      focus: 'Phrasal verbs in everyday English',
      minutes: 25,
      goals: ['Understand and use 16 high-frequency phrasal verbs', 'Know which phrasal verbs are separable', 'Replace formal verbs with natural alternatives in conversation'],
      slides: [
        { t: 'text', title: 'What are phrasal verbs?',
          body: ['A **phrasal verb** = verb + particle (up, out, on, off…). The meaning is often different from the single words: *give up* = stop trying.', 'They are extremely common in speaking. Formal: *postpone the meeting* → natural: *put off the meeting*.'] },
        { t: 'table', title: 'Work and study', head: ['Phrasal verb', 'Meaning', 'Example'],
          rows: [['carry on', 'continue', '**Carry on** — you’re doing great.'], ['figure out', 'understand / solve', 'I can’t **figure out** this problem.'], ['put off', 'postpone', 'They **put off** the meeting until Friday.'], ['come up with', 'think of (an idea)', 'She **came up with** a brilliant plan.'], ['look into', 'investigate', 'We’ll **look into** your complaint.'], ['fill in', 'complete (a form)', 'Please **fill in** this form.']] },
        { t: 'table', title: 'People and relationships', head: ['Phrasal verb', 'Meaning', 'Example'],
          rows: [['get on (well) with', 'have a good relationship', 'I **get on** well **with** my colleagues.'], ['look up to', 'admire', 'I’ve always **looked up to** my grandmother.'], ['fall out (with)', 'argue and stop being friends', 'They **fell out** over money.'], ['bring up', 'raise a child / mention a topic', 'She was **brought up** in Sabah.'], ['turn down', 'refuse an offer', 'He **turned down** the job.'], ['catch up (with)', 'meet and share news', 'Let’s **catch up** next week!']] },
        { t: 'text', title: 'Separable or not?',
          body: ['Some phrasal verbs can be **separated**: *turn down the offer* = *turn the offer down*.', 'With a **pronoun**, you must separate them: *turn it down* (~~turn down it~~), *fill it in*, *put it off*.',
            'Others are **inseparable**: *look into it*, *get on with him*, *look up to her*.'] },
        { t: 'examples', title: 'In conversation', items: [['I’ve run out of milk — can you pick some up on your way home?', 'run out of / pick up'], ['We need to sort out this problem before Monday.', 'sort out = solve'], ['Hang on a second, I’ll check.', 'hang on = wait'], ['Why don’t you try it on? The fitting room is over there.', 'try on clothes'], ['I’m really looking forward to the holidays.', 'look forward to + noun / -ing']] }
      ],
      vocab: [['give up', 'stop trying / stop a habit'], ['run out of', 'have no more of something'], ['sort out', 'solve, organise'], ['hang on', 'wait a moment'], ['pick up', 'collect / learn informally'], ['try on', 'put on clothes to see if they fit'], ['look forward to', 'feel happy about a future event'], ['show up', 'arrive, appear']],
      practice: [
        ['choice', 'The meeting has been ___ until next week.', ['put off', 'put out', 'put on', 'put up'], 'put off = postpone.'],
        ['choice', 'I really ___ my older sister. She’s my role model.', ['look up to', 'look into', 'look after', 'look for'], 'look up to = admire.'],
        ['gap', 'We’ve ___ out of coffee. Can you buy some? (run)', ['run'], 'run out of = have no more.'],
        ['choice', 'They offered him a job but he turned ___.', ['it down', 'down it', 'it off', 'off it'], 'With a pronoun, separate the verb: turn it down.'],
        ['choice', 'I’m looking forward to ___ you.', ['seeing', 'see', 'saw', 'have seen'], '"to" is a preposition here → -ing.'],
        ['gap', 'Please ___ in this form and sign at the bottom. (fill)', ['fill'], 'fill in = complete a form.'],
        ['match', 'Match the phrasal verb with its meaning.', [['figure out', 'understand'], ['carry on', 'continue'], ['come up with', 'invent an idea'], ['fall out', 'argue'], ['show up', 'arrive']]],
        ['order', 'I get on well with my colleagues.'],
        ['listen', 'We need to sort this out before the deadline.']
      ],
      summary: ['Phrasal verbs make your English natural: put off, figure out, get on with, turn down…', 'Separable verbs must be separated with pronouns: turn it down, fill it in.', 'look forward to + -ing: I’m looking forward to meeting you.']
    }
  ]
});
